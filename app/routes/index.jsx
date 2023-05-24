import React, {useState} from 'react';
import {useLoaderData, Link} from '@remix-run/react';
import Products from '../components/Products';
import ProductDetails from '../components/ProductDetails';
import opensea from '../images/opensea.svg';
import discord from '../images/discord.svg';
import twitter from '../images/twitter.svg';

export const meta = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export async function loader({context}) {
  return await context.storefront.query(GET_PRODUCTS);
}

export default function Index() {
  const {products} = useLoaderData();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const redeemable = 4;

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

  return (
    <div className="relative flex justify-center items-center h-full">
      <main className="negative-m flex justify-center items-center">
        <section className="bg-[#363636] px-2 pt-2 pb-10 clip-path-notched-xlg">
          <div className="relative h-22 bg-[#85aae4] clip-path-notched-tp-xlg">
            <div
              className="absolute w-full top-0 right-0 bottom-0 left-0 bg-[#658ac7] px-4 pt-6 blue-stripe
          before:absolute before:w-full before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#f0a460] before:orange-stripe
          after:absolute after:w-full after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[#ffd36a] after:yellow-stripe"
            ></div>
            <div className="h-full flex justify-start items-center ml-8">
              <span className="bg-[#e39858] py-6 pl-4 mr-1 relative"></span>
              <span className="bg-[#e39858] py-6 pl-3 mr-1 relative"></span>
              <span className="bg-[#e39858] py-6 pl-2 mr-1 relative"></span>
              <span className="text-white text-4-5xl border-text mt-2 relative ml-4">
                Redeem Process
              </span>
            </div>
          </div>
          <div className="bg-[#cfd3db] px-4 pt-6 clip-path-notched-bt-xlg">
            <div className="py-10 px-10 clip-path-notched-xlg flex items-center flex-col justify-center bg-[#adb9cf]">
              <Products
                products={products}
                onProductClick={(product) => setSelectedProduct(product)}
              />
              <span className="mt-10 text-white text-4xl text-center bold-text">
                You have{' '}
                <span className="text-[#edbc5a] text-4xl">{`${redeemable} free`}</span>{' '}
                reward(s) to redeem,
                <br />
                Click on proceed to go to checkout and shipping details!
              </span>
            </div>
            <div className="flex justify-center items-center relative pt-2 overlap">
              <div className="z-10 bg-[#cfd3db] py-2 px-8 clip-path-notched-tp-xlg w-fit">
                <div className="bg-[#363636] px-1-5 pt-1-5 pb-4 clip-path-notched-sm">
                  <button className="	bg-gradient-to-b from-[#7fceff] via-[#6291db] to-[#597ed0] px-6 pt-3 pb-2 clip-path-notched-sm">
                    <span className="text-white text-4xl uppercase light-text">
                      Proceed
                    </span>
                  </button>
                </div>
              </div>
              <span className="absolute bottom-0 w-3/4 border-solid border-8 border-[#aeafba] z-0"></span>
              <span className="absolute bottom-6 w-3/4 border-solid border-6 border-[#aeafba] z-0"></span>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col mb-40">
            <div className="bg-[#363636] pt-1 pr-1 pb-1 clip-path-notched-r-xlg ">
              <div className="bg-[#afbdc5] pl-3 pr-4 py-2 clip-path-notched-r-xlg ">
                {socials.map((social) => (
                  <div
                    key={social.link}
                    className="bg-[#363636] p-0-5 pb-3 clip-path-notched-lrg my-3"
                  >
                    <div className="bg-[#afbdc5] py-4 p-3 clip-path-notched-lrg flex items-center justify-center">
                      <a href={social.link}>
                        <img className=" white" src={social.icon} alt="" />
                      </a>
                    </div>
                  </div>
                ))}
                {/* <div className="bg-[#363636] p-0-5 pb-3 clip-path-notched-lrg my-3">
                  <div className="bg-[#afbdc5] p-3 clip-path-notched-lrg">
                    <a href="https://twitter.com/home">
                      <img src="https://placehold.co/50x50" alt="" />
                    </a>
                  </div>
                </div>

                <div className="bg-[#363636] p-0-5 pb-3 clip-path-notched-lrg my-3">
                  <div className="bg-[#afbdc5] p-3 clip-path-notched-lrg">
                    <a href="https://twitter.com/home">
                      <img src="https://placehold.co/50x50" alt="" />
                    </a>
                  </div>
                </div>

                <div className="bg-[#363636] p-0-5 pb-3 clip-path-notched-lrg my-3">
                  <div className="bg-[#afbdc5] p-3 clip-path-notched-lrg">
                    <a href="https://twitter.com/home">
                      <img src="https://placehold.co/50x50" alt="" />
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
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
