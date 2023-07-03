import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from '@remix-run/react';
import message from '../images/messageboxicon.svg';
import gift from '../images/gifticon.svg';

/**
 * A Drawer component that opens on user click.
 * @param open - Boolean state. If `true`, then the drawer opens.
 * @param onClose - Function should set the open state.
 * @param children - React children node.
 */
function Drawer({open, onClose, children}) {
  const showCoupon = useSelector((state) => state.coupon.showCoupon);
  const checkoutUrl = useSelector((state) => state.checkout.checkoutUrl);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const encryptedString = urlParams.get('coupon');

  const couponFromState = useSelector((state) => state.code.couponCode);
  const [coupon, setCoupon] = useState(couponFromState || encryptedString);

  const couponRef = useRef();
  const [clickedOnShowCoupon, setClickedOnShowCoupon] = useState(true);
  const [timer, setTimer] = useState(5);
  const [isExiting, setIsExiting] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCoupon(couponFromState || encryptedString);
  }, [couponFromState]);

  useEffect(() => {
    let interval;
    if (showCoupon && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showCoupon, timer]);

  useEffect(() => {
    if (timer === 0) {
      return;
    }
  }, [timer]);

  const handleShowCouponClick = (e) => {
    setIsExiting(false);
    setTimeout(() => {
      setClickedOnShowCoupon(false);
      setIsExiting(true);
    }, 700);
  };

  const handleClose = (e) => {
    if (!clickedOnShowCoupon) {
      onClose();
      setCopied(false);
    }
  };

  useEffect(() => {
    if (!clickedOnShowCoupon) {
      setClickedOnShowCoupon(true);
      onClose();
      setCopied(false);
    }
  }, [clickedOnShowCoupon]);

  const handleButtonClick = async () => {
    await copyToClipboard(couponRef.current.value);
    setClickedOnShowCoupon(true);
    setCopied(true);
  };

  const handleInputClick = async () => {
    await copyToClipboard(couponRef.current.value);
    setClickedOnShowCoupon(true);
    setCopied(true);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      return;
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute cursor-custom inset-0 overflow-hidden">
            <div className="z-50 h-fit w-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center absolute">
              {showCoupon && (
                <div
                  className={`${
                    clickedOnShowCoupon && isExiting
                      ? 'animate-slideRight'
                      : 'animate-backSlideRight'
                  }`}
                >
                  <div
                    className={`bg-black p-1 pb-4 clip-path-notched-xlg z-50 items-center justify-center ${
                      showCoupon ? '' : ''
                    }`}
                  >
                    <div
                      className={`bg-[#85aae4] clip-path-notched-tp-xlg flex items-center p-2`}
                    >
                      <img className="pl-2 pb-2 h-12 w-14" src={message} />
                      <div className="flex flex-row items-center w-full justify-between">
                        <p className="pl-2 items-center text-white text-3xl border-text">
                          Message
                        </p>
                        <div
                          className={`closeShadow clip-path-notched-sm ${
                            clickedOnShowCoupon && isExiting
                              ? 'animate-slideUp'
                              : 'animate-backSlideUp'
                          }`}
                        >
                          <button
                            className="cursor-pointer closeHover clip-path-notched-sm"
                            onClick={() => handleShowCouponClick()}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`h-fit w-fit clip-path-notched-bt-xlg bg-[#d9e2ee] p-2 ${
                        clickedOnShowCoupon && isExiting
                          ? 'animate-blink'
                          : 'animate-backBlink'
                      }`}
                    >
                      <div
                        className={`bg-[#a1acbf] text-center clip-path-notched-xlg ${
                          clickedOnShowCoupon && isExiting
                            ? 'animate-blink'
                            : 'animate-backBlink'
                        }`}
                      >
                        <p className="text-center py-4 text-2xl text-[#ffe48b] border-text">
                          FREE coupon code
                        </p>

                        <div className="px-2 pb-3 m-auto text-center text-[#6f6f6f] text-3xl flex justify-center items-center">
                          <div className="bg-black p-1 clip-path-notched-lrg z-20">
                            <div className="clip-path-notched-lrg px-6 pb-2 py-4 m-auto text-center bg-[white] text-[#6f6f6f] text-3xl flex justify-center items-center">
                              <input
                                className="cursor-pointer"
                                id="couponCode"
                                type="text"
                                value={coupon}
                                ref={couponRef}
                                onClick={handleInputClick}
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="clip-path-notched-r -ml-3 z-10 transition-all duration-500 ease-in-out">
                            <button
                              onClick={handleButtonClick}
                              className={`cursor-pointer transition-colors duration-300 ease-in-out text-center text-white px-4 pb-1 py-4 clip-path-notched-r-lrg ${
                                copied ? 'bg-[#e39858]' : 'bg-[#5877ab]'
                              }`}
                            >
                              COPY{' '}
                            </button>
                          </div>
                        </div>

                        <div className="text-xl bg-[#6c7288] py-3 clip-path-notched-lrg w-11/12 m-auto">
                          <p className={'text-[#b5b9cb] border-text leading-2'}>
                            Do not share your link and
                            <br />
                            coupon code with anyone.
                          </p>
                        </div>
                        <p className="text-xl text-[#6b6b6d] py-2">
                          The check out link will open in
                          <span className="text-2xl text-[#ff2929] py-2">
                            {' '}
                            {timer}
                          </span>{' '}
                          {`second(s).`}
                          <br />
                          If undirected please click{' '}
                          <a className="text-[#ffe48b]" href={checkoutUrl}>
                            here
                          </a>{' '}
                          to checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="clip-path-notched-l-lrg py-1 pl-1 max-w-2xl  bg-[#282724] my-3">
                  <Dialog.Panel className="h-full clip-path-notched-l-lrg transform text-left align-middle shadow-xl transition-all antialiased bg-[#b4c2d9] flex flex-col">
                    <header className="sticky top-0 justify-between flex-0">
                      <div className=" bg-[#85aae4] w-full flex justify-start items-center py-3">
                        <div
                          className="absolute w-full top-0 right-0 bottom-0 left-0 bg-[#658ac7] px-4 pt-6 blue-stripe
          before:absolute before:w-full before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#f0a460] before:orange-stripe
          after:absolute after:w-full after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-[#ffd36a] after:yellow-stripe"
                        ></div>
                        <img className="ml-6 z-10 w-8 h-8" src={gift} alt="" />
                        <div className="flex items-center flex-row align-items-center w-full justify-between">
                          <h2
                            id="cart-contents"
                            className="font-bold text-2xl text-white pt-3 ml-1 pl-1 z-10 border-text-sm"
                          >
                            {`Free Carts`}
                          </h2>
                          <div className="closeShadow clip-path-notched-sm">
                            <button
                              className="cursor-pointer closeHover clip-path-notched-sm"
                              onClick={() => handleShowCouponClick()}
                            >
                              x
                            </button>
                          </div>
                        </div>
                      </div>
                    </header>
                    {children}
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export {Drawer};

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}

function IconClose() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="w-5 h-5"
    >
      <title>Close</title>
      <line
        x1="4.44194"
        y1="4.30806"
        x2="15.7556"
        y2="15.6218"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <line
        y1="-0.625"
        x2="16"
        y2="-0.625"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 4.75)"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
