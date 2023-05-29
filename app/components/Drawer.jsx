import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';

/**
 * A Drawer component that opens on user click.
 * @param open - Boolean state. If `true`, then the drawer opens.
 * @param onClose - Function should set the open state.
 * @param children - React children node.
 */
function Drawer({open, onClose, children}) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
          <div className="absolute inset-0 overflow-hidden">
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
                        <img
                          className="ml-6 z-10"
                          src="https://placehold.co/25x25"
                          alt=""
                        />
                        <h2
                          id="cart-contents"
                          className="whitespace-pre-wrap max-w-prose font-bold text-2xl text-white pt-1 ml-1 pl-1 z-10 border-text-sm"
                        >
                          {`Free Cart`}
                        </h2>

                        {/* <button
                        type="button"
                        className="my-8 text-3xl transition text-primary bg-red hover:text-primary/50 text-tertiary px-2 py-1/2  mr-1 text-center"
                        onClick={onClose}
                      >
                        <span>x</span>
                      </button> */}
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
