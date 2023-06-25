import {useEffect, useState, Suspense} from 'react';
import {Await} from '@remix-run/react';
import {Drawer, useDrawer} from '~/components/Drawer';
import {useMatches} from '@remix-run/react';
import {CartLineItems, CartActions, CartSummary} from '~/components/Cart';
import stars from '../images/stars.png';
import aiko from '../images/aiko-logo.svg';
import meepo from '../images/aikomeepologo.svg';

import {useDispatch} from 'react-redux';
import {setActiveReward} from '../state/rewardSlice';

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

export function Layout({children, title}) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const [root] = useMatches();
  const [showCoupon, setShowCoupon] = useState(false);
  const dispatch = useDispatch();
  const cart = root.data?.cart;

  const cartCheck = new Promise((resolve, reject) => {
    resolve(root.data?.cart);
  });

  cartCheck
    .then((value) => {
      const nodes = value.lines.edges.map((edge) => edge.node);
      dispatch(setActiveReward(nodes));
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen antialiased overflow-hidden relative">
      <img
        className="opacity-30 absolute w-full h-full animate-slide scale-150"
        src={stars}
        alt=""
      />

      <div className="before:opacity-90 before:rotate-200 before:translate-x-20 before:absolute before:block before:w-full before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-gradient-to-l before:from-white via-transparent"></div>

      <div className="flex xl:w-6-12 3xl:w-3/4 5xl:w-2/5">
        <img
          className="w-56 xl:w-64	top-0 left-0 relative z-50 -mt-32 xl:-mt-36"
          src={meepo}
          alt=""
        />
      </div>

      <div className=" bg-[#84858c] clip-path-notched-xlg absolute w-9/10 h-5/6 xl:w-8/12 xl:h-9/10 p-1 3xl:w-3/4 3xl:h-4/5 4xl:w-8/12 5xl:w-2/4 5xl:h-3/5">
        <div className=" bg-[#d1d8e2] clip-path-notched-xlg relative w-full h-full  flex items-center justify-center">
          <span className="absolute bottom-0 text-xl flex justify-center items-center py-3 2xl:py-6">
            <img className="h-8 w-8" src={aiko} alt="" />
            <p className="text-[#84858c] tracking-tighter ml-2 text-lg">
              Powered By Aiko Virtual
            </p>
            <CartHeader cart={cart} openDrawer={openDrawer} />
          </span>
        </div>
      </div>
      <main
        role="main"
        id="mainContent"
        className="flex justify-center items-center"
      >
        {children}
      </main>

      <Drawer showCoupon={showCoupon} open={isOpen} onClose={closeDrawer}>
        <CartDrawer cart={cart} close={closeDrawer} />
      </Drawer>
    </div>
  );
}
