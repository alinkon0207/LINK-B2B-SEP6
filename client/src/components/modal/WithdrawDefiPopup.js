/* eslint-disable no-unused-vars */
import { Dialog, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NGNC from '../../assets/images/svg/NGNC-logo.svg';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';
import { useWalletWithdrawMutation } from '../../services/walletTransactionApi';
import {
  selectCurrentUID,
  selectCurrentUser,
} from '../../features/auth/authSlice';

export default function WithdrawDefiPopup({
  isOpen,
  closeModal,
  balance,
  network,
  address,
  asset,
}) {
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentUID);
  const userName = useSelector(selectCurrentUser);

  const [isLoading, setIsLoading] = useState(false);
  const [payAddress, setPayAddress] = useState();
  const [amount, setAmount] = useState(10);
  const [fee, setFee] = useState(0);

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

  useEffect(() => {
    calcFee(amount);
  }, [amount, fee]);

  const calcFee = (amount) => {
    const fee = amount * 0.015;
    return setFee(fee);
  };

  const ref = Math.random().toString(36).slice(2, 34);
  const [withdrawWallet] = useWalletWithdrawMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await withdrawWallet({
        userId,
        userName,
        network,
        address,
        amount,
        asset,
        payAddress,
        custRef: ref,
      }).unwrap();
      toast.success(response.message);
      navigate('/request/success');
    } catch (error) {
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-[#F3F4F6] py-6 px-8 text-left align-middle shadow transition-all">
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
                    Withdraw to a <span className="lowercase">{network}</span>{' '}
                    wallet
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

                      <div className="bg-[#DBE7FF] text-lg text-primary font-medium p-3 pr-5 rounded-md flex justify-between items-center w-full space-x-4 mt-3 md:mt-0">
                        <p className="text-sm md:text-base mr-14">
                          Available balance
                        </p>
                        <p className="text-sm md:text-base text-primary">
                          {balance} NGNC
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500 text-lg lowercase">
                        <span>{network}</span> wallet address
                      </p>
                      <input
                        className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                        type="text"
                        value={payAddress}
                        placeholder="Enter wallet address"
                        name="payAddress"
                        onChange={(e) => setPayAddress(e.target.value)}
                      />
                    </div>
                    <div className="md:flex justify-center w-full">
                      <button
                        type="submit"
                        className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-blue-400 transition duration-200 ease-out cursor-pointer outline-none"
                      >
                        Withdraw
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
