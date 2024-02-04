/* eslint-disable no-unused-vars */
import { Dialog, Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import {
  selectCurrentUID,
  selectCurrentUser,
} from '../../features/auth/authSlice';
import NGNC from '../../assets/images/svg/NGNC-logo.svg';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';
import { useWalletTransferMutation } from '../../services/walletTransactionApi';

export default function TransferNgncPopup({
  isOpen,
  closeModal,
  balance,
  network,
  address,
  asset,
  link_address,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(10);

  const navigate = useNavigate();
  const userId = useSelector(selectCurrentUID);
  const userName = useSelector(selectCurrentUser);

  const inputCheck = () => {
    if (amount < 0) {
      return setAmount(0);
    }
    if (amount > balance) {
      return setAmount(balance);
    }
  };

  // useEffect
  useEffect(() => {
    inputCheck();
  }, [amount]);

  const ref = Math.random().toString(36).slice(2, 34);
  const [transferWallet] = useWalletTransferMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await transferWallet({
        userId,
        userName,
        network,
        address,
        amount,
        asset,
        link_address,
        custRef: ref,
      }).unwrap();
      toast.success(response.message);
      navigate('/user/dashboard');
    } catch (error) {
      console.log(error.message);
      toast.error(error.data.message);
      setIsLoading(false);
    }
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-xl bg-[#F3F4F6] py-6 px-8 text-left align-middle shadow transition-all">
                  <div
                    onClick={closeModal}
                    className="flex items-center justify-end space-x-3 text-primary text-lg font-medium mb-3 cursor-pointer font-circular"
                  >
                    <span>Cancel</span>
                    <CgClose className="text-2xl" />
                  </div>

                  <Dialog.Title
                    as="h1"
                    className="text-black text-2xl lg:text-3xl font-semibold font-circular"
                  >
                    Transfer
                  </Dialog.Title>

                  <form
                    className="mt-8 mb-2 font-circular space-y-8"
                    onSubmit={handleSubmit}
                  >
                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-500 text-lg mb-3">
                          Amount in Naira
                        </p>
                        <div className="w-full bg-white rounded-md flex space-x-20 p-3">
                          <div className="flex items-center text-gray-500 font-normal text-lg space-x-3">
                            <img className="w-9" src={NGNC} alt="LINK Logo" />
                            <p>NGNC</p>
                          </div>
                          <input
                            className="w-full bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                            type="number"
                            value={amount}
                            placeholder="Enter amount"
                            name="amount"
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="bg-white text-lg text-gray-900 font-medium p-3 pr-5 rounded-md flex justify-between items-center w-full space-x-4">
                        <div className="flex space-x-3">
                          <p>100</p>
                          <p className="mr-14">NGNC</p>
                        </div>
                        <p className="text-gray-500">Fee</p>
                      </div>
                      <div className="bg-[#DBE7FF] text-lg text-primary font-medium p-3 pr-5 rounded-md flex justify-between items-center w-full space-x-4 mt-3 md:mt-0">
                        <p className="text-sm md:text-base mr-14">
                          Available balance
                        </p>
                        <p className="text-sm md:text-base text-primary">
                          {balance} NGNC
                        </p>
                      </div>
                    </div>
                    <div className="text-black">
                      <p>
                        You'll be sending your NGNC to the {network} address
                        below. Authorise this transfer by clicking "Confirm".
                        This wallet address is for Transfer ONLY.
                      </p>
                    </div>
                    <div className="block bg-white rounded-lg py-3 px-5 text-gray-500 md:flex justify-between items-center mt-10">
                      <textarea
                        className="resize-none w-full bg-white text-xs md:text-base lg:text-lg text-black p-1 rounded-md placeholder-gray-500 outline-none"
                        disabled
                        cols="3"
                        rows="2"
                        value={link_address}
                      ></textarea>
                    </div>
                    <div className="md:flex justify-center w-full">
                      <button className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-blue-400 transition duration-200 ease-out cursor-pointer outline-none">
                        Confirm
                        {isLoading && (
                          <ImSpinner2 className="text-white animate-spin " />
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
