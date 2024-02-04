/* eslint-disable no-unused-vars */
import { Fragment, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { useNavigate, useLocation } from 'react-router-dom';
import NGN from '../../assets/icons/naira.png';
import { Dialog, Transition } from '@headlessui/react';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Header } from '../../components';
import { useStellarWithdrawMutation } from '../../services/stellarApi';
// import { selectCurrentUID } from "../../features/auth/authSlice";

const initialState = {
  linkTag: '',
  amount: '',
};

const Withdrawal = () => {
  const [withdraw, setWithdraw] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(
    'GCQLPBWOQ5PAJYEEQBE7GDSY7X3LCYKFEBKOCNF3OUA6F74ORK74HVSQ'
  );
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const uID = useSelector(selectCurrentUID);
  const navigate = useNavigate();

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    toast('✅ Copied to clipboard');
  };

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWithdraw((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const search = useLocation().search;
  const transaction_id = new URLSearchParams(search).get('transaction_id');
  const asset_code = new URLSearchParams(search).get('asset_code');
  const transaction = new URLSearchParams(search).get('type');
  const token = new URLSearchParams(search).get('token');

  const [stellarWithdrawal] = useStellarWithdrawMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // console.log(transaction);
      const transact = await stellarWithdrawal({
        // uID,
        transaction,
        transaction_id,
        ...data,
      }).unwrap();
      openModal();
      // console.log(transact);
      toast(transact.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(error.data);
    }
  };

  const handleClose = () => {
    closeModal();

    navigate({
      pathname: '/request-status',
      search: `?asset_code=${asset_code}&transaction_id=${transaction_id}&amount=${withdraw.amount}&type=${transaction}&token=${token}`,
    });
  };

  return (
    <>
      <Header cross="none" />
      <div className="max-w-[80%] md:max-w-[70%] mx-auto mb-10 sm:px-12 ">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-black text-3xl md:text-4xl font-semibold">
            Withdraw
          </h1>
          <div
            onClick={window.close}
            className="flex items-center space-x-3 text-primary text-lg font-medium mb-3 cursor-pointer"
          >
            <span>Cancel</span>
            <CgClose className="text-2xl" />
          </div>
        </div>
        <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 mt-5">
            <p className="text-gray-500 text-lg">LINK Tag</p>
            <input
              {...register('linkTag', { required: true })}
              className="w-full bg-white text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 outline-none"
              placeholder="Enter your LINK Tag"
              onChange={handleChange}
            />
            {errors.linkTag && (
              <p className="text-rose-600">Your LINK Tag is required</p>
            )}
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-2xl lg:text-xl font-medium" />
              <p className="text-blue-700 text-md font-medium">
                If you don' have a LINK tag, you can create one by signup on{' '}
                <u>
                  <a href="https://app.linkio.africa/signup">LINK</a>
                </u>
              </p>
            </div>
          </div>
          <div className="space-y-2 mt-5">
            <p className="text-gray-500 text-lg">Amount to Withdraw</p>
            <div className="w-full bg-white p-3  rounded-md flex space-x-5">
              <img className="w-9" src={NGN} alt="LINK Logo" />
              <input
                {...register('amount', { required: true })}
                className="text-lg text-gray-500 placeholder-gray-400 outline-none"
                type="number"
                placeholder="500,000.00"
                onChange={handleChange}
              />
            </div>
            {errors.amount && (
              <p className="text-rose-600">
                Please enter the amount you want to withdraw
              </p>
            )}
          </div>
          <div className="space-y-5 my-10">
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-3xl md:text-2xl lg:text-xl font-medium" />
              <p className="text-black text-lg font-medium">
                Ensure the stellar address is the address associated with this
                account.
              </p>
            </div>
          </div>

          <div className="md:flex justify-center items-center pt-3">
            <button className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer">
              <span>Request Withdraw</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
        </form>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="backdrop-blur-sm fixed inset-0 z-10 overflow-y-auto bg-[#00000036]"
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
                  className="font-sans rounded-lg inline-block w-full max-w-lg p-10 my-8 overflow-hidden text-left align-middle transition-all transform"
                  style={{ backgroundColor: '#F3F4F6' }}
                >
                  <div
                    className="mt-1 cursor-pointer flex justify-end my-2"
                    onClick={handleClose}
                  >
                    <CgClose className="text-2xl text-primary" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <p className="text-2xl font-semibold text-black ">
                      Send the exact NGNC to the stellar address below
                    </p>
                  </Dialog.Title>
                  <div className="mt-8 flex space-x-3 items-center py-2 px-3 rounded-md text-sm md:text-base border bg-white">
                    <textarea
                      style={{ caretColor: 'transparent' }}
                      onChange={() => {}}
                      name=""
                      id=""
                      cols="20"
                      rows="2"
                      value={code}
                      className="resize-none flex-grow text-primary text-md outline-none"
                    ></textarea>

                    {/* COde to copy text on clicking */}
                    <button onClick={copy}>
                      <FiCopy className="text-xl text-black transform rotate-180 active:text-primary cursor-pointer" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <BsInfoCircle className="text-primary text-2xl md:text-xl font-medium" />
                    <p className="text-black text-lg font-medium">
                      Add your LINK tag as a memo.
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-500 text-base">
                      Close this window when done
                    </p>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Withdrawal;
