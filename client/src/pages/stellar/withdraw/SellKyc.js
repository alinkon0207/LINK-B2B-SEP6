import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react';
import { BsCheck, BsChevronExpand } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Header } from '../../../components';
import { BiArrowBack } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { KycList } from '../../../libs/kycList';
import { url, url2 } from '../../../api';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const SellKyc = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selected, setSelected] = useState(KycList[0]);
  const [idNumber, setIDNumber] = useState('');
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const wallet_address = location.state.wallet_address;

  const onSubmit = async () => {
    setIsLoading(true);
    const idType = selected.name;
    const idCode = selected.model;
    try {
      const { data } = await axios.get(
        `${url2}/transaction/customer-kyc?idType=${idType}&idCode=${idCode}&idNumber=${idNumber}&email=${email}&address=${wallet_address}`
      );
      if (data.status === 'success') {
        toast.success(data.message);
        navigate('/stellar/withdraw-status', {
          state: {
            ...location.state,
          },
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header cross="none" />
      <div className="max-w-[80%] md:max-w-[70%] mx-auto mb-10 sm:px-12 ">
        <div className="flex items-center justify-between mb-5">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center space-x-3 text-primary text-lg font-medium mb-3 cursor-pointer"
          >
            <BiArrowBack className="text-3xl" />
          </div>
          <h1 className="text-primary text-xl font-semibold">
            Identification Details
          </h1>
          <div
            onClick={window.close}
            className="flex items-center space-x-3 text-primary text-lg font-medium mb-3 cursor-pointer"
          >
            <span className="hidden md:block"> </span>
            {/* <CgClose className="text-2xl hidden" /> */}
          </div>
        </div>
        <form className="mt-4">
          <div className="space-y-6 mb-6">
            <p className="text-black text-base">Complete KYC to continue </p>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-gray-500 text-lg">ID Type</p>
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border text-black  bg-white p-3 text-left text-base">
                        <span className="flex items-center">
                          <span className="ml-3 block truncate">
                            {selected.name}
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
                          {KycList.map((kyc, index) => (
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
                              value={kyc}
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
                                      {kyc.name}
                                    </span>
                                  </div>
                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? 'text-white'
                                          : 'text-indigo-600',
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
            <div className="space-y-2 mt-2">
              <p className="text-gray-500 text-lg">ID number</p>
              <input
                type="text"
                className="w-full bg-white text-lg text-gray-500 px-3 py-2 rounded-md placeholder-gray-400 outline-none"
                placeholder="Enter Id number"
                onChange={(e) => setIDNumber(e.target.value)}
                required
                readOnly={selected.name === 'Select ID' ? true : false}
              />
            </div>
            <div className="space-y-2 mt-2">
              <p className="text-gray-500 text-lg">Email Address</p>
              <input
                type="email"
                className="w-full bg-white text-lg text-gray-500 px-3 py-2 rounded-md placeholder-gray-400 outline-none"
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="md:flex justify-center items-center pt-3  mt-4">
            {idNumber === '' || email === '' ? (
              <button
                type="button"
                className="bg-disabledAlt px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-xl mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
                onClick={null}
              >
                <span>Verify</span>
              </button>
            ) : (
              <button
                type="button"
                className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-xl mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
                onClick={handleSubmit(onSubmit)}
              >
                <span>Verify</span>
                {isLoading && (
                  <ImSpinner2 className="text-white animate-spin " />
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SellKyc;
