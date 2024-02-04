import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import NGNC from "../assets/ngnc.png";
import NumberFormat from "react-number-format";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

import { NetworkSelector } from "./NetworkSelector";
import { Close, Copy, Info } from "../assets/Images";
import { selectNetwork, selectAddress } from "../features/networkInputSlice";

export const SellNGNC = () => {
  const [amount, setAmount] = useState(50000);
  const [code] = useState("AIKFNSYLD7LD7JKA19893ASKJKJKSKUSDDSSIIS92");
  const [isOpen, setIsOpen] = useState(false);

  const network = useSelector(selectNetwork);
  const address = useSelector(selectAddress);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    // toast("✅ Copied to clipboard");
  };

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    openModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="space-y-2 relative">
            <div className="AmountInput ">
              <span>
                <img
                  src={NGNC}
                  alt="ngnc"
                  className="w-10 h-10 object-contain"
                />
              </span>
              <NumberFormat
                value={amount}
                thousandSeparator={true}
                className=" outline-none text-4xl text-center md:text-4xl text-black font-semibold w-full bg-transparent"
                inputMode="numeric"
                onValueChange={(values, sourceInfo) => {
                  setAmount(values.value);
                }}
              />
            </div>
          </div>
          <p className="text-primary text-center font-semibold text-sm">
            ~ NGN
          </p>
        </div>
        <div className="space-y-5">
          <div>
            <NetworkSelector />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-slate-500 text-sm">
              LINK Tag
            </label>
            <div className="flex items-center bg-[#F3F4F6] p-3 space-x-1  rounded-md">
              <input
                className=" outline-none text-lg text-gray-600 w-full bg-transparent"
                placeholder="Enter LINK Tag"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Info width={25} height={25} />
              <p className="text-sm text-black">
                Ensure the LINK Account is the one tied to this stellar wallet.
              </p>
            </div>
          </div>

          <div className="bg-[#DBE7FF] py-2 px-3 text-primary rounded-md">
            <div className="grid grid-cols-2 gap-5 md:gap-10 items-center justify-between">
              <p className="font-medium text-base">1 NGN = 1 NGNC</p>
              <p className="text-sm lg:text-base">Exchange rate</p>
            </div>
            <div className="grid grid-cols-2 gap-5 md:gap-10 items-center justify-between">
              <p className="font-medium text-base">0%</p>
              <p className="text-sm lg:text-base">Fees</p>
            </div>
          </div>
          <div>
            <button className="bg-secondary rounded-md text-white text-lg py-2 px-8 w-full">
              Continue
            </button>
          </div>
        </div>
      </form>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="backdrop-blur-xs fixed inset-0 z-10 overflow-y-auto bg-[#00000036]"
          onClose={openModal}
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
                className="rounded-lg inline-block w-full max-w-sm py-8 px-8 my-8 overflow-hidden text-left align-middle transition-all transform"
                style={{ backgroundColor: "#F3F4F6" }}
              >
                <Link
                  to={{
                    pathname: "/success",
                  }}
                  state={{
                    request: "Sell",
                  }}
                >
                  <div className="mt-1 cursor-pointer flex justify-end mb-4">
                    <Close width={15} height={15} />
                  </div>
                </Link>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <p className="text-xl font-semibold text-black ">
                    Send the exact NGNC to the {network} address below
                  </p>
                </Dialog.Title>
                <div className="mt-4 flex space-x-3 items-center py-2 px-3 rounded-md text-sm md:text-base border bg-white">
                  <textarea
                    style={{ caretColor: "transparent" }}
                    onChange={() => {}}
                    name=""
                    id=""
                    cols="30"
                    rows="2"
                    value={address}
                    disabled
                    className="resize-none flex-grow text-gray-600 font-normal outline-none text-sm overflow-hidden"
                  ></textarea>

                  <button onClick={copy}>
                    <Copy width={15} height={15} />
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Info width={25} height={25} />
                  <p className="text-black text-base font-medium">
                    Add your LINK tag as a memo.
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-500 text-base font-medium">
                    Close this window when done
                  </p>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
