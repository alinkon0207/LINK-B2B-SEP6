/* eslint-disable no-unused-vars */
import { useState, useEffect, Fragment } from 'react';
import {
  BsArrowLeft,
  BsInfoCircle,
  BsChevronExpand,
  BsCheck,
} from 'react-icons/bs';
import axios from 'axios';
import { url, url2 } from '../../api';
import { CgClose } from 'react-icons/cg';
import { Header } from '../../components';
import { Link } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import NGN from '../../assets/flags/NGN-rectangle.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Listbox, Transition } from '@headlessui/react';
import { useBankWithdrawalMutation } from '../../services/transactionApi';
// import { useAccountWithdrawalMutation } from "../../services/accountApi";
import {
  selectCurrentUID,
  selectCurrentUser,
} from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

const banks = [
  {
    bank_name: '9Payment Service Bank',
    bank_code: '120001',
  },
  {
    bank_name: 'Access Bank',
    bank_code: '000014',
  },
  {
    bank_name: 'Access Bank (Diamond)',
    bank_code: '000005',
  },
  {
    bank_name: 'Citibank Nigeria',
    bank_code: '000009',
  },
  {
    bank_name: 'Ecobank',
    bank_code: '000010',
  },
  {
    bank_name: 'Eyowo',
    bank_code: '090328',
  },
  {
    bank_name: 'Fidelity Bank',
    bank_code: '000007',
  },
  {
    bank_name: 'First Bank of Nigeria',
    bank_code: '000016',
  },
  {
    bank_name: 'Globus Bank',
    bank_code: '000027',
  },
  {
    bank_name: 'Guaranty Trust Bank',
    bank_code: '000013',
  },
  {
    bank_name: 'Heritage Bank',
    bank_code: '000020',
  },
  {
    bank_name: 'Jaiz Bank',
    bank_code: '000006',
  },
  {
    bank_name: 'Keystone Bank',
    bank_code: '000002',
  },
  {
    bank_name: 'Kuda',
    bank_code: '090267',
  },
  {
    bank_name: 'Paga',
    bank_code: '100002',
  },
  {
    bank_name: 'PalmPay',
    bank_code: '100033',
  },
  {
    bank_name: 'Parallex Bank',
    bank_code: '000030',
  },
  {
    bank_name: 'Polaris Bank',
    bank_code: '000008',
  },
  {
    bank_name: 'Providus Bank',
    bank_code: '000023',
  },
  {
    bank_name: 'Stanbic IBTC Bank',
    bank_code: '000012',
  },
  {
    bank_name: 'Standard Chartered Bank',
    bank_code: '000021',
  },
  {
    bank_name: 'Sterling Bank',
    bank_code: '000001',
  },
  {
    bank_name: 'Suntrust Bank',
    bank_code: '000022',
  },
  {
    bank_name: 'Union Bank of Nigeria',
    bank_code: '000018',
  },
  {
    bank_name: 'United Bank for Africa',
    bank_code: '000004',
  },
  {
    bank_name: 'Unity Bank',
    bank_code: '000011',
  },
  {
    bank_name: 'VFD Microfinance Bank',
    bank_code: '090110',
  },
  {
    bank_name: 'Wema Bank',
    bank_code: '000017',
  },
  {
    bank_name: 'Zenith Bank',
    bank_code: '000015',
  },
];

const initialState = {
  transaction: 'bank withdraw',
  amount: '',
  account_number: '',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const WithdrawalBank = () => {
  const [bankWithdraw, setBankWithdraw] = useState(initialState);
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(banks[0]);
  const [accNameCheck, setAccNameCheck] = useState('');

  const navigate = useNavigate();
  const id = useSelector(selectCurrentUID);
  const user = useSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBankWithdraw((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const bankCode = selected.bank_code;
  const bankName = selected.bank_name;
  const accountNumber = bankWithdraw.account_number;

  const checkIDNumber = () => {
    if (accountNumber.length !== 10)
      setAccNameCheck('🚫 provide 10 digits of account number');
    if (accountNumber.length === 10) {
      setAccNameCheck('');
      handleCheckAccountNumber();
    }
  };

  const handleCheckAccountNumber = async () => {
    const loading = toast.loading('checking account number...');
    try {
      const { data } = await axios.get(
        `${url2}/account/verify-account-number?num=${accountNumber}&bankCode=${bankCode}`
      );
      if (data.status === 'Failed') {
        setAccNameCheck(data.message);
        setAccountName('null');
        toast.dismiss(loading);
      } else {
        toast.dismiss(loading);
        setAccountName(data.name);
        setAccNameCheck('✅ Account name retrieved');
      }
    } catch (error) {
      setAccNameCheck('🚫 Account number not found');
      toast.dismiss(loading);
    }
  };

  useEffect(() => {
    checkIDNumber();
  }, [accountNumber]);

  const ref = Math.random().toString(36).slice(2, 29);
  const [bankWithdrawal] = useBankWithdrawalMutation();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await bankWithdrawal({
        id,
        user,
        custRef: ref,
        bankCode,
        bankName,
        account_name: accountName,
        ...data,
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
      <Header cross="none" />

      <div className="max-w-[90%] md:max-w-[70%] mx-auto mb-10 sm:px-12 ">
        <div className="flex items-center justify-between mb-3">
          <Link
            to="/withdraw/pay-method"
            className="flex items-center space-x-3 text-primary text-xl font-medium mb-5"
          >
            <BsArrowLeft className="text-2xl" /> <span>Go back</span>
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
          Bank account withdrawal
        </h1>

        <form className="space-y-8 mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">Select Bank</p>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border text-black  bg-white p-3 text-left text-base">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {selected.bank_name}
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
                        {banks.map((bank, index) => (
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
                            value={bank}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {bank.bank_name}
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
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">Account number</p>
            <input
              {...register('account_number', { required: true, min: 1 })}
              className="w-full bg-white text-lg text-gray-500 p-3 rounded-md placeholder-gray-500 outline-none"
              type="tel"
              required
              readOnly={false}
              maxLength="10"
              placeholder="E.g 4120661825"
              onChange={handleChange}
            />
            <p className="mb-4 text-black">{accNameCheck}</p>
            {errors.account_number && (
              <p className="text-rose-600">This field is required</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">Account name</p>
            <input
              {...register('account_name', { required: true })}
              className="w-full bg-white text-lg text-gray-500 p-3 rounded-md placeholder-gray-500 outline-none"
              placeholder="Enter account name"
              type="text"
              value={accountName}
              onChange={handleChange}
            />
            {errors.account_name && (
              <p className="text-rose-600">This field is required</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">Amount</p>
            <div className="w-full bg-white p-3  rounded-md flex space-x-5">
              <div className="flex">
                <img className="w-9 mr-4" src={NGN} alt="LINK Logo" />
                <p className="mr-8 text-lg text-gray-500">NGN</p>
              </div>
              <input
                {...register('amount', { required: true, min: 3 })}
                className="w-full text-lg text-gray-500 placeholder-gray-500 outline-none"
                type="number"
                placeholder="Enter amount"
                min="100"
                onChange={handleChange}
              />
            </div>
            {errors.amount && (
              <p className="text-rose-600">This field is required</p>
            )}
          </div>
          <div className="space-y-5 pt-5">
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-4xl lg:text-2xl font-medium" />
              <p className="text-black text-lg font-medium">
                Fees on withdrawal to bank account: Free (in some cases 50NGN
                capped)
              </p>
            </div>
          </div>
          <div className="md:flex items-center justify-center pt-3">
            <button
              type="submit"
              className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
            >
              <span>Request withdrawal</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WithdrawalBank;
