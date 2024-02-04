/* eslint-disable no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const NgncPopup = ({ action = false }) => {
  let [isOpen, setIsOpen] = useState(action);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center"></div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          // onClose={openModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="inline-block w-full max-w-lg p-10 my-8 overflow-hidden text-left align-middle transition-all transform"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <div
                  className="mt-4 cursor-pointer flex justify-end my-5"
                  onClick={closeModal}
                >
                  <AiOutlineClose className="text-primary text-3xl" />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <h1 className="text-2xl font-bold text-black ">
                    Send the exact NGNC to the stellar address below
                  </h1>
                </Dialog.Title>
                <div className="mt-8 flex space-x-3 items-center py-2 px-4 rounded-md text-sm border bg-white">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="2"
                    value="GAQQ7TWRSU4SFXX63QUN23NIF7DSCB6QMUPJAMKTKFSV6MNYIKVJVBKP"
                    className="resize-none flex-grow text-gray-400 outline-none"
                  ></textarea>
                  <FiCopy className="text-xl transform rotate-180 active:text-primary cursor-pointer" />
                </div>

                <div className=" mt-14 mb-4">
                  <p className="text-gray-500 text-base">
                    Close this window when done
                  </p>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NgncPopup;
