import React, {useState, useEffect, Suspense} from 'react';
// import {fetchQuery} from '@remix-run/react';
import {useFetcher} from '@remix-run/react';
import {Await} from '@remix-run/react';
import {useLoaderData, Link} from '@remix-run/react';
import Products from '../components/Products';
import opensea from '../images/opensea.svg';
import discord from '../images/discord.svg';
import twitter from '../images/twitter.svg';
import computer from '../images/aikocomputer.png';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CartLineItems, CartActions, CartSummary} from '~/components/Cart';
import {useMatches} from '@remix-run/react';
import {AddToCartButton} from '@shopify/hydrogen-react';
import {useSelector} from 'react-redux';
import meepo from '../images/aikomeepologo.svg';
import aiko from '../images/aiko-logo.svg';

export const meta = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export async function loader({context}) {
  return await context.storefront.query(GET_PRODUCTS);
}

function CartHeader({cart, openDrawer}) {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <button
            className="relative ml-auto flex items-center justify-center w-8 h-8"
            onClick={openDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <title>Bag</title>
              <path
                fillRule="evenodd"
                d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
              ></path>
            </svg>
            {data?.totalQuantity > 0 && (
              <div className="text-contrast bg-red-500 text-white absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px">
                <span>{data?.totalQuantity}</span>
              </div>
            )}
          </button>
        )}
      </Await>
    </Suspense>
  );
}

function CartDrawer({cart, close}) {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <>
            {data?.totalQuantity > 0 ? (
              <>
                <div className="flex flex-1 overflow-y-hidden border-formLightBlue">
                  <div className="bg-[#d9e2ee] clip-path-notched-xlg m-5 flex flex-col space-y-7 justify-between items-center px-3 py-3 overflow-y-auto">
                    <CartLineItems linesObj={data.lines} />
                  </div>
                </div>
                <div className="w-full md:px-12 px-4 py-6 space-y-6">
                  <CartSummary cost={data.cost} />
                  <CartActions checkoutUrl={data.checkoutUrl} />
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
                <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
                  Your cart is empty
                </h2>
                <button
                  onClick={close}
                  className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}

export default function Index() {
  const redeemableAmount = useSelector(
    (state) => state.redeemable.redeemableAmount,
  );
  console.log(redeemableAmount);
  const {products} = useLoaderData();
  console.log(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const redeemable = products?.edges.length;
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const [root] = useMatches();
  const cart = root.data?.cart;

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  console.log(windowWidth);

  const couponError = useSelector((state) => state.error.couponError);

  console.log(couponError);

  function openDrawerClick() {
    openDrawer();
  }

  const socials = [
    {
      icon: twitter,
      link: 'https://twitter.com/aikovirtual',
    },
    {
      icon: opensea,
      link: 'https://opensea.io/collection/aikovirtual',
    },
    {
      icon: discord,
      link: 'https://discord.gg/g6V5SxQFV8',
    },
  ];

  const [isHovered, setIsHovered] = useState(
    new Array(socials.length).fill(false),
  );

  console.log(isHovered);

  return windowWidth > 1024 ? (
    <div className="relative">
      <Drawer open={isOpen} onClose={closeDrawer}>
        <CartDrawer cart={cart} close={closeDrawer} />
      </Drawer>
      <div className="w-fit p-10 h-fit relative">
        <div className="flex relative top-20 left-10 z-[1] ">
          <img
            className="w-56 xl:w-64	top-0 left-0 relative -mt-32 xl:-mt-36"
            src={meepo}
            alt=""
          />
        </div>

        <div className="absolute right-3 flex top-60 z-[0]">
          <div className="relative bg-[#363636] pt-1 pr-1 pb-1 clip-path-notched-r-xlg">
            <div className="bg-[#afbdc5] pl-3 pr-4 py-2 clip-path-notched-r-xlg ">
              {socials.map((social, index) => (
                <div
                  key={social.link}
                  className="bg-[#363636] p-0-5 pb-3 clip-path-notched-lrg my-2 2xl:my-3"
                  onMouseEnter={() =>
                    setIsHovered((prevHoverState) => {
                      const newHoverState = [...prevHoverState];
                      newHoverState[index] = true;
                      return newHoverState;
                    })
                  }
                  onMouseLeave={() =>
                    setIsHovered((prevHoverState) => {
                      const newHoverState = [...prevHoverState];
                      newHoverState[index] = false;
                      return newHoverState;
                    })
                  }
                >
                  <div
                    className={` ${
                      isHovered[index] ? 'bg-[#619ee2]' : 'bg-[#afbdc5]'
                    } transition-all py-3 2xl:py-4 p-2 2xl:p-3 clip-path-notched-lrg flex items-center justify-center`}
                  >
                    <a href={social.link}>
                      <img className="white w-full" src={social.icon} alt="" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" bg-[#84858c] clip-path-notched-xlg w-fit p-1 h-fit z-[-2]">
          <div className="absolute right-3 flex top-60 z-[0]">
            <div className="relative bg-[#363636] pt-1 pr-1 pb-1 clip-path-notched-r-xlg">
              <div className="bg-[#afbdc5] pl-3 pr-4 py-2 clip-path-notched-r-xlg ">
                {socials.map((social, index) => (
                  <div
                    key={social.link}
                    className="bg-[#363636] p-0-5 pb-3 clip-path-notched-lrg my-2 2xl:my-3"
                    onMouseEnter={() =>
                      setIsHovered((prevHoverState) => {
                        const newHoverState = [...prevHoverState];
                        newHoverState[index] = true;
                        return newHoverState;
                      })
                    }
                    onMouseLeave={() =>
                      setIsHovered((prevHoverState) => {
                        const newHoverState = [...prevHoverState];
                        newHoverState[index] = false;
                        return newHoverState;
                      })
                    }
                  >
                    <div
                      className={` ${
                        isHovered[index] ? 'bg-[#619ee2]' : 'bg-[#afbdc5]'
                      } transition-all py-3 2xl:py-4 p-2 2xl:p-3 clip-path-notched-lrg flex items-center justify-center`}
                    >
                      <a href={social.link}>
                        <img
                          className="white w-full"
                          src={social.icon}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" bg-[#d1d8e2] clip-path-notched-xlg relative w-full z-[-2] p-20 h-full flex items-center justify-center">
            <span className="absolute bottom-0 text-xl flex justify-center items-center py-3 2xl:py-6">
              <img className="h-8 w-8" src={aiko} alt="" />
              <p className="text-[#84858c] tracking-tighter ml-2 text-lg">
                Powered By Aiko Virtual
              </p>
            </span>
            <div className="relative flex justify-center items-center h-full">
              <main className="negative-m flex justify-center items-center">
                <div className="flex flex-col">
                  <section className="bg-[#363636] px-2 pt-2 pb-10 clip-path-notched-xlg">
                    <div className="relative h-16 2xl:h-22 bg-[#85aae4] clip-path-notched-tp-xlg">
                      <div
                        className="absolute w-full top-0 right-0 bottom-0 left-0 bg-[#658ac7] px-4 pt-6 blue-stripe
          before:absolute before:w-full before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#f0a460] before:orange-stripe
          after:absolute after:w-full after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[#ffd36a] after:yellow-stripe"
                      ></div>
                      <div className="h-full flex justify-start items-center ml-8">
                        <span className="bg-[#e39858] py-5 2xl:py-6 pl-3 2xl:pl-4 mr-1 relative"></span>
                        <span className="bg-[#e39858] py-5 2xl:py-6 pl-2 2xl:pl-3 mr-1 relative"></span>
                        <span className="bg-[#e39858] py-5 2xl:py-6 pl-1 2xl:pl-2 mr-1 relative"></span>
                        {couponError ? (
                          <span className="text-white text-3xl 2xl:text-4-5xl border-text mt-2 relative ml-3 2xl:ml-4">
                            error_msg.exe
                          </span>
                        ) : (
                          <span className="text-white text-3xl 2xl:text-4-5xl border-text mt-2 relative ml-3 2xl:ml-4">
                            Redeem Process
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-[#cfd3db] px-4 pt-6 clip-path-notched-bt-xlg">
                      <div className="py-8 px-10 clip-path-notched-xlg flex items-center flex-col justify-center bg-[#adb9cf]">
                        <Products products={products} />
                        {couponError ? (
                          <div className="flex flex-col justify-center items-center">
                            <img
                              className="w-2/5 h-2/5"
                              src={computer}
                              alt=""
                            />
                            <span className="mt-3 text-white text-2xl 2xl:text-4xl text-center bold-text">
                              It looks like you don't have a coupon code!
                              <br /> Please generate your coupon link on
                              <br />
                              <a href="https://aikovirtual.com/userpanel">
                                <span className="text-[#edbc5a] text-2xl 2xl:text-4xl">
                                  www.aikovirtual.com/userpanel
                                </span>{' '}
                              </a>
                              <br />
                              before accessing this page.
                            </span>
                          </div>
                        ) : (
                          <span className="mt-10 text-white text-2xl 2xl:text-4xl text-center bold-text">
                            You have{' '}
                            <span className="text-[#edbc5a] text-2xl 2xl:text-4xl">{`${redeemableAmount} free`}</span>{' '}
                            reward(s) to redeem,
                            <br />
                            Click on proceed to go to checkout and shipping
                            details!
                          </span>
                        )}
                      </div>

                      <div className="flex justify-center items-center relative pt-2 overlap">
                        <div className="z-10 bg-[#cfd3db] py-2 px-8 clip-path-notched-tp-xlg w-fit">
                          <div className="bg-[#363636] px-0-5 2xl:px-1-5 pt-1-5 pb-3 2xl:pb-4 clip-path-notched-sm">
                            {couponError ? (
                              <button
                                className="before:opacity-1 hover:before:opacity-0 bg-gradient-to-b before:transition-opacity relative from-[#d3d3d3] via-[#a9a9a9] to-[#a9a9a9] px-6 pt-3 pb-2 clip-path-notched-sm
   before:absolute before:top-0 before:right-0 before:bg-gradient-to-b before:bottom-0 before:left-0 before:from-[#7fceff] before:via-[#6291db] before:to-[#597ed0]"
                              >
                                <span className="relative text-white text-3xl 2xl:text-4xl uppercase light-text">
                                  Error
                                </span>
                              </button>
                            ) : (
                              <Await resolve={cart}>
                                {(data) => (
                                  <>
                                    {data?.totalQuantity ===
                                    redeemableAmount ? (
                                      <>
                                        <button
                                          onClick={() => openDrawerClick()}
                                          className="before:opacity-1 hover:before:opacity-0 bg-gradient-to-b before:transition-opacity relative from-[#ffcf65] via-[#eea462] to-[#de7e5e] px-6 pt-3 pb-2 clip-path-notched-sm
                before:absolute before:top-0 before:right-0 before:bg-gradient-to-b before:bottom-0 before:left-0 before:from-[#7fceff] before:via-[#6291db] before:to-[#597ed0]"
                                        >
                                          <span className="relative text-white text-3xl 2xl:text-4xl uppercase light-text">
                                            Proceed
                                          </span>
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          className="before:opacity-1 hover:before:opacity-0 bg-gradient-to-b before:transition-opacity relative from-[#d3d3d3] via-[#a9a9a9] to-[#a9a9a9] px-6 pt-3 pb-2 clip-path-notched-sm
              before:absolute before:top-0 before:right-0 before:bg-gradient-to-b before:bottom-0 before:left-0 before:from-[#7fceff] before:via-[#6291db] before:to-[#597ed0]"
                                        >
                                          <span className="relative text-white text-3xl 2xl:text-4xl uppercase light-text">
                                            Proceed
                                          </span>
                                        </button>
                                      </>
                                    )}
                                  </>
                                  // ... render some JSX using the data
                                )}
                              </Await>
                            )}
                          </div>
                        </div>
                        <span className="absolute bottom-0 w-3/4 border-solid border-8 border-[#aeafba] z-0"></span>
                        <span className="absolute bottom-6 w-3/4 border-solid border-6 border-[#aeafba] z-0"></span>
                      </div>
                    </div>
                  </section>
                </div>
                <section className="opacity-0">
                  <div className="flex flex-col mb-40">
                    <div className="bg-[#363636] pt-1 pr-1 pb-1 clip-path-notched-r-xlg ">
                      <div className="bg-[#afbdc5] pl-3 pr-4 py-2 clip-path-notched-r-xlg ">
                        {socials.map((social) => (
                          <div
                            key={social.link}
                            className="bg-[#363636] p-0-5 pb-3 clip-path-notched-lrg my-2 2xl:my-3"
                          >
                            <div className="bg-[#afbdc5] group-hover:bg-[#619ee2] py-3 2xl:py-4 p-2 2xl:p-3 clip-path-notched-lrg flex items-center justify-center">
                              <a href={social.link}>
                                <img
                                  className="white w-full"
                                  src={social.icon}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <section className="bg-[#363636] px-1 pt-1 pb-5 clip-path-notched-xlg">
      <div className="relative h-16 2xl:h-22 bg-[#85aae4] clip-path-notched-tp-xlg">
        <div
          className="absolute w-full top-0 right-0 bottom-0 left-0 bg-[#658ac7] px-4 pt-6 blue-stripe
          before:absolute before:w-full before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#f0a460] before:orange-stripe
          after:absolute after:w-full after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[#ffd36a] after:yellow-stripe"
        ></div>
        <div className="h-full flex justify-start items-center ml-8">
          <span className="bg-[#e39858] py-5 2xl:py-6 pl-3 2xl:pl-4 mr-1 relative"></span>
          <span className="bg-[#e39858] py-5 2xl:py-6 pl-2 2xl:pl-3 mr-1 relative"></span>
          <span className="bg-[#e39858] py-5 2xl:py-6 pl-1 2xl:pl-2 mr-1 relative"></span>
          <span className="text-white text-2xl border-text mt-2 relative ml-3 2xl:ml-4">
            error_msg.exe
          </span>
        </div>
      </div>
      <div className="bg-[#cfd3db] px-4 pt-6 clip-path-notched-bt-xlg">
        <div className="py-8 px-10 clip-path-notched-xlg flex items-center flex-col justify-center bg-[#adb9cf]">
          <img className="w-60" src={computer} alt="" />
          <span className="mt-2 text-white text-lg text-center bold-text">
            A:\Please use your computer to access this page
          </span>
        </div>

        <div className="flex justify-center items-center relative pt-2 overlap">
          <div className="z-10 bg-[#cfd3db] py-2 px-8 clip-path-notched-tp-xlg w-fit">
            <div className="bg-[#363636] px-0-5 2xl:px-1-5 pt-1-5 pb-3 2xl:pb-4 clip-path-notched-sm">
              <button
                className="before:opacity-1 hover:before:opacity-0 bg-gradient-to-b before:transition-opacity relative from-[#d3d3d3] via-[#a9a9a9] to-[#a9a9a9] px-6 pt-3 pb-2 clip-path-notched-sm
   before:absolute before:top-0 before:right-0 before:bg-gradient-to-b before:bottom-0 before:left-0 before:from-[#7fceff] before:via-[#6291db] before:to-[#597ed0]"
              >
                <span className="relative text-white text-2xl uppercase light-text">
                  Error
                </span>
              </button>
            </div>
          </div>
          <span className="absolute bottom-0 w-3/4 border-solid border-8 border-[#aeafba] z-0"></span>
          <span className="absolute bottom-6 w-3/4 border-solid border-6 border-[#aeafba] z-0"></span>
        </div>
      </div>
    </section>
  );
}

const GET_PRODUCTS = `#graphql
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
              }
            }
          }
          variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        }
      }
    }
  }
`;
