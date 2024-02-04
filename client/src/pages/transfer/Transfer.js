import { useState, Fragment, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NGN from '../../assets/flags/NGN-rectangle.svg';
import { Header } from '../../components';
import { BsArrowLeft, BsChevronExpand, BsCheck } from 'react-icons/bs';
import { Listbox, Transition } from '@headlessui/react';
import { ImSpinner2 } from 'react-icons/im';
import toast from 'react-hot-toast';
import STELLAR from '../../assets/images/svg/stellar.png';
import SOLANA from '../../assets/images/svg/Solana.png';
import POLYGON from '../../assets/images/svg/polygon.png';
import Avalanche from '../../assets/images/svg/Avalanche.png';
import { useTransferWithdrawalMutation } from '../../services/transactionApi';
import { useSelector } from 'react-redux';
import { selectNgncAddresses } from '../../features/ngncWalletSlice';
import {
  selectCurrentUID,
  selectCurrentUser,
} from '../../features/auth/authSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TransferNgn = () => {
  const userId = useSelector(selectCurrentUID);
  const userName = useSelector(selectCurrentUser);
  const ngncAddresses = useSelector(selectNgncAddresses);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(3000);
  const [payout, setPayout] = useState(0);
  const [value, setValue] = useState(0);
  const [fee, setFee] = useState(1.5);
  const navigate = useNavigate();

  const [selected, setSelected] = useState(ngncAddresses[0]);
  const location = useLocation();
  const details = location.state;

  const accNum = details.accountNumber;
  const walletAddress = selected.asset_address;

  const inputCheck = () => {
    if (amount < 0) {
      return setAmount(0);
    }
    if (amount > details.balance) {
      return setAmount(details.balance);
    }
  };

  const feeCheck = () => {
    if (amount > 0 && amount < 66000) {
      return setValue(0.015 * amount);
    }
    if (amount > 60000 && amount < 10000000) {
      return setValue(0.015 * amount + 650);
    }
  };

  // useEffect
  useEffect(() => {
    inputCheck();
    feeCheck();
    setPayout(amount - value);
  }, [amount, value, payout]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAmount((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const ref = Math.random().toString(36).slice(2, 29);
  const [transferWithdrawal] = useTransferWithdrawalMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await transferWithdrawal({
        userId,
        userName,
        accNum,
        amount,
        value,
        payout,
        custRef: ref,
        walletAddress,
      }).unwrap();
      toast.success(response.message);
      navigate('/user/dashboard');
    } catch (error) {
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header cross="none" />

      <div className="max-w-[70%] mx-auto mb-10 sm:px-12 ">
        <div className="flex items-center justify-between mb-3">
          <Link
            to="/user/ngn-account"
            className="flex items-center space-x-3 text-primary text-xl font-medium mb-5"
          >
            {/* <BsArrowLeft className="text-2xl" /> <span>Go back</span>SS */}
          </Link>
          <Link
            to="/user/dashboard"
            className="flex items-center space-x-3 text-primary text-xl font-medium mb-5"
          >
            <span>Cancel</span>
            <CgClose className="text-2xl" />
          </Link>
        </div>

        <h1 className="text-black text-3xl md:text-[2.7rem] lg:text-5xl font-semibold">
          Transfer
        </h1>

        <form
          className="mt-8 mb-2 font-circular space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {/* <div>
              <p className="text-gray-500 text-lg mb-3">Amount</p>
              <div className="w-full bg-white rounded-md flex space-x-20 p-3">
                <div className="flex items-center text-gray-500 font-normal text-lg space-x-3">
                  <img className="w-9" src={NGN} alt="LINK Logo" />
                  <p>NGN</p>
                </div>
                <input
                  className="w-full bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  required={true}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div> */}

            <div className="block lg:flex justify-between items-center lg:space-x-5 lg:space-y-0 md:space-y-6">
              <div className="bg-white text-lg text-gray-900 font-medium p-3 pr-5 rounded-md flex justify-between items-center w-full space-x-4">
                <p className="text-sm md:text-base mr-14">Amount: </p>
                {/* <p className="text-sm md:text-base text-primary">NGN</p> */}
                <input
                  className="w-full bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  required={true}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="bg-[#DBE7FF] text-lg text-primary font-medium p-3 pr-5 rounded-md flex justify-between items-center w-full space-x-4 mt-3 md:mt-0">
                <p className="text-sm md:text-base mr-14">Available balance:</p>
                <p className="text-sm md:text-base text-primary">
                  {details.balance} NGN
                </p>
              </div>
            </div>

            <div className="block lg:flex justify-between items-center lg:space-x-5 lg:space-y-0 md:space-y-6">
              <div className="bg-white text-lg text-gray-900 font-medium p-3 pr-5 rounded-md flex justify-between items-center w-full space-x-4">
                <p className="text-sm md:text-base mr-14">Transfer Fee:</p>
                <p className="text-sm md:text-base text-primary">
                  {value.toFixed(2)} NGN
                </p>
              </div>
              <div className="bg-[#DBE7FF] text-lg text-primary font-medium p-3 pr-5 rounded-md flex justify-between items-center w-full space-x-4 mt-3 md:mt-0">
                <p className="text-sm md:text-base mr-14">Amount Paid Out:</p>
                <p className="text-sm md:text-base text-primary">
                  {payout.toFixed(2)} NGN
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">Select NGNC wallet</p>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border text-black  bg-white p-3 text-left text-base">
                      <span className="flex items-center">
                        {/* <img
                          src={selected.asset_chain}
                          alt=""
                          className="h-8 w-8 flex-shrink-0 rounded-full"
                        /> */}
                        <span className="ml-3 block truncate">
                          {selected.asset_chain}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <BsChevronExpand
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {ngncAddresses.map((data, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'text-white bg-indigo-600'
                                  : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={data}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  {/* <img
                                    src={SOLANA}
                                    alt=""
                                    className="h-8 w-8 flex-shrink-0 rounded-full"
                                  /> */}
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {data.asset_chain} NGNC WALLET
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <BsCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="md:flex justify-center w-full">
            <button className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-blue-400 transition duration-200 ease-out cursor-pointer outline-none">
              Transfer
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TransferNgn;
