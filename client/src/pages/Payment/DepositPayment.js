/* eslint-disable no-unused-vars */
import { BsArrowLeft, BsChevronRight } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../../components";
import { ngncLauncher } from "../../utils/ngncLauncher";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";

const DepositPayment = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleLaunchNgnc = () => {
    ngncLauncher();
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Header cross="none" />

      <div className="max-w-[90%] md:max-w-[70%] mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to=""
            className="flex items-center space-x-3 text-primary text-xl font-medium mb-5"
          >
            {/* <BsArrowLeft className="text-2xl" /> <span>Go back</span> */}
          </Link>
          <Link
            to="/user/dashboard"
            className="flex items-center space-x-3 text-primary text-xl font-medium mb-5"
          >
            <span>Cancel</span>
            <CgClose className="text-2xl" />
          </Link>
        </div>

        <h1 className="text-black text-3xl md:text-4xl font-semibold mt-2">
          Deposit
        </h1>
        <div className="space-y-10 mt-10">
          <div
            className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary"
            onClick={handleLaunchNgnc}
          >
            <div className="flex items-center space-x-5">
              <NGNIcon
                className="w-10 h-10 md:w-16 md:h-16 lg:w-12 lg:h-12 mr-2"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <h1 className="text-black text-xl font-medium">
                  Multi-chain NGNC
                </h1>
                <p className="text-gray-500 text-base md:text-lg">
                  Sell NGNC and Deposit into your naira account.
                </p>
              </div>
            </div>
            <div>
              <BsChevronRight className="text-gray-400 text-2xl" />
            </div>
          </div>
          <div
            className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary"
            onClick={handleOpenModal}
          >
            <div className="flex items-center space-x-5">
              <Bank
                className="w-10 h-10 md:w-16 md:h-16 lg:w-12 lg:h-12 mr-2"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <h1 className="text-black text-xl font-medium">
                  Naira account
                </h1>
                <p className="text-gray-500 text-base md:text-lg">
                  Deposit into bank account
                </p>
              </div>
            </div>
            <div>
              <BsChevronRight className="text-gray-400 text-2xl" />
            </div>
          </div>

          <NGNAccDetailPopup
            isOpen={open}
            closeModal={handleCloseModal}
            details={location.state}
          />
        </div>
      </div>
    </>
  );
};

export default DepositPayment;

function NGNIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39.5" cy="39.5" r="39.5" fill="#DBE7FF" />
      <path
        d="M23 55V24.9024C23 24.6139 23.3675 24.4917 23.5403 24.7228L30.7241 34.3333M46.1724 24V54.0976C46.1724 54.3861 45.8049 54.5083 45.6321 54.2772L30.7241 34.3333M30.7241 34.3333H55M38.8548 45.2105H55"
        stroke="#1565D8"
        strokeWidth="3"
      />
    </svg>
  );
}

function Bank(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39.5" cy="39.5" r="39.5" fill="#DBE7FF" />
      <path
        d="M57.2758 39.0071H21.7258C19.8298 39.0071 18.2695 37.4469 18.2695 35.5509V28.9939C18.2695 27.6509 19.1977 26.2881 20.442 25.7944L38.217 18.6844C38.9675 18.3882 40.0341 18.3882 40.7846 18.6844L58.5596 25.7944C59.8038 26.2881 60.732 27.6706 60.732 28.9939V35.5509C60.732 37.4469 59.1718 39.0071 57.2758 39.0071ZM39.5008 21.4099C39.4218 21.4099 39.3428 21.4098 39.3033 21.4296L21.548 28.5396C21.4295 28.5989 21.232 28.8556 21.232 28.9939V35.5509C21.232 35.8274 21.4493 36.0446 21.7258 36.0446H57.2758C57.5523 36.0446 57.7695 35.8274 57.7695 35.5509V28.9939C57.7695 28.8556 57.5918 28.5989 57.4536 28.5396L39.6786 21.4296C39.6391 21.4098 39.5798 21.4099 39.5008 21.4099Z"
        fill="#1565D8"
      />
      <path
        d="M59.2508 60.7321H19.7508C18.941 60.7321 18.2695 60.0606 18.2695 59.2508V53.3258C18.2695 51.4298 19.8298 49.8696 21.7258 49.8696H57.2758C59.1718 49.8696 60.732 51.4298 60.732 53.3258V59.2508C60.732 60.0606 60.0605 60.7321 59.2508 60.7321ZM21.232 57.7696H57.7695V53.3258C57.7695 53.0493 57.5523 52.8321 57.2758 52.8321H21.7258C21.4493 52.8321 21.232 53.0493 21.232 53.3258V57.7696Z"
        fill="#1565D8"
      />
      <path
        d="M23.701 52.8321C22.8912 52.8321 22.2197 52.1606 22.2197 51.3509V37.5259C22.2197 36.7161 22.8912 36.0446 23.701 36.0446C24.5107 36.0446 25.1822 36.7161 25.1822 37.5259V51.3509C25.1822 52.1606 24.5107 52.8321 23.701 52.8321Z"
        fill="#1565D8"
      />
      <path
        d="M31.6004 52.8321C30.7906 52.8321 30.1191 52.1606 30.1191 51.3509V37.5259C30.1191 36.7161 30.7906 36.0446 31.6004 36.0446C32.4101 36.0446 33.0816 36.7161 33.0816 37.5259V51.3509C33.0816 52.1606 32.4101 52.8321 31.6004 52.8321Z"
        fill="#1565D8"
      />
      <path
        d="M39.5008 52.8321C38.691 52.8321 38.0195 52.1606 38.0195 51.3509V37.5259C38.0195 36.7161 38.691 36.0446 39.5008 36.0446C40.3105 36.0446 40.982 36.7161 40.982 37.5259V51.3509C40.982 52.1606 40.3105 52.8321 39.5008 52.8321Z"
        fill="#1565D8"
      />
      <path
        d="M47.4012 52.8321C46.5914 52.8321 45.9199 52.1606 45.9199 51.3509V37.5259C45.9199 36.7161 46.5914 36.0446 47.4012 36.0446C48.2109 36.0446 48.8824 36.7161 48.8824 37.5259V51.3509C48.8824 52.1606 48.2109 52.8321 47.4012 52.8321Z"
        fill="#1565D8"
      />
      <path
        d="M55.3006 52.8321C54.4908 52.8321 53.8193 52.1606 53.8193 51.3509V37.5259C53.8193 36.7161 54.4908 36.0446 55.3006 36.0446C56.1103 36.0446 56.7818 36.7161 56.7818 37.5259V51.3509C56.7818 52.1606 56.1103 52.8321 55.3006 52.8321Z"
        fill="#1565D8"
      />
      <path
        d="M61.2262 60.7321H17.7762C16.9664 60.7321 16.2949 60.0606 16.2949 59.2508C16.2949 58.4411 16.9664 57.7696 17.7762 57.7696H61.2262C62.0359 57.7696 62.7074 58.4411 62.7074 59.2508C62.7074 60.0606 62.0359 60.7321 61.2262 60.7321Z"
        fill="#1565D8"
      />
      <path
        d="M39.5004 34.0696C37.0514 34.0696 35.0566 32.0748 35.0566 29.6258C35.0566 27.1768 37.0514 25.1821 39.5004 25.1821C41.9494 25.1821 43.9441 27.1768 43.9441 29.6258C43.9441 32.0748 41.9494 34.0696 39.5004 34.0696ZM39.5004 28.1446C38.6906 28.1446 38.0191 28.8161 38.0191 29.6258C38.0191 30.4356 38.6906 31.1071 39.5004 31.1071C40.3101 31.1071 40.9816 30.4356 40.9816 29.6258C40.9816 28.8161 40.3101 28.1446 39.5004 28.1446Z"
        fill="#1565D8"
      />
    </svg>
  );
}

export function NGNAccDetailPopup({ isOpen, closeModal, details }) {
  const handleCopy = (data) => {
    navigator.clipboard.writeText(data);
    toast.success("Copied to clipboard");
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl font-circular transform overflow-hidden rounded-xl bg-white py-6 px-8 text-left align-middle shadow transition-all">
                  <div
                    className="flex items-center justify-between mt-3 mb-5"
                    onClick={closeModal}
                  >
                    <h3 className="text-primary text-xl font-semibold">
                      Account Details
                    </h3>
                    <CgClose className="text-3xl text-primary hover:bg-primary hover:bg-opacity-5 p-1 rounded-md cursor-pointer transition-all ease-linear" />
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between space-x-5">
                      <div className="space-y-1">
                        <h1 className="text-black text-xl font-medium">
                          Account holder
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg">
                          {details.accountName}
                        </p>
                      </div>
                      <div
                        className="w-8 h-8 md:w-10 md:h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => handleCopy(details.accountName)}
                      >
                        <MdOutlineContentCopy className="text-xl md:text-2xl text-primary" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between space-x-5">
                      <div className="space-y-1">
                        <h1 className="text-black text-xl font-medium">
                          Account number
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg">
                          {details.accountNumber}
                        </p>
                      </div>
                      <div
                        className="w-8 h-8 md:w-10 md:h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => handleCopy(details.accountNumber)}
                      >
                        <MdOutlineContentCopy className="text-xl md:text-2xl text-primary" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between space-x-5">
                      <div className="space-y-1">
                        <h1 className="text-black text-xl font-medium">
                          Bank name
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg">
                          {details.bankName}
                        </p>
                      </div>
                      <div
                        className="w-8 h-8 md:w-10 md:h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => handleCopy(details.bankName)}
                      >
                        <MdOutlineContentCopy className="text-xl md:text-2xl text-primary" />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
