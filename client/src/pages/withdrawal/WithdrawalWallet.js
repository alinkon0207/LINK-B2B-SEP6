/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import { BsArrowLeft, BsInfoCircle } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useWalletWithdrawalMutation } from "../../services/transactionApi";
import { selectCurrentUID } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const initialState = {
  transaction: "withdraw",
  amount: "",
  wallet_address: "",
};

const WithdrawalWallet = () => {
  const [walletWithdraw, setWalletWithdraw] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const uID = useSelector(selectCurrentUID);
  const [fee, setFee] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Use Effect
  useEffect(() => {
    const newFee = numCalc(walletWithdraw.amount);
    setFee(newFee);
  }, [walletWithdraw.amount]);

  useEffect(() => {
    const newFee = numCalc(walletWithdraw.amount);
    setFee(newFee);
  }, [walletWithdraw.amount]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWalletWithdraw((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // calculating fee
  const numCalc = (num) => {
    let newNum = num.toFixed(2);
    // let separator = newNum
    //   .toString()
    //   .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return newNum;
  };

  const [walletWithdrawal] = useWalletWithdrawalMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const transaction = await walletWithdrawal({ uID, ...data }).unwrap();
      navigate({
        pathname: "/withdraw-status",
        search: `?fee=${fee}&wallet_id=${walletWithdraw.wallet_address}&amount=${walletWithdraw.amount}&transaction=${walletWithdraw.transaction}`,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(error.data);
    }
  };

  return (
    <>
      <Header cross="none" />

      <div className="max-w-[90%] md:max-w-[80%] mx-auto mb-4 sm:px-12 ">
        <div className="flex items-center justify-between">
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

        <h1 className="text-black text-4xl md:text-5xl font-semibold mt-5">
          Withdraw NGNC
        </h1>

        <form className="space-y-8 mt-10">
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">
              Stellar address or Foundation address
            </p>
            <input
              {...register("wallet_address", { required: true })}
              className="w-full bg-white text-lg text-gray-500 p-3 rounded-md placeholder-gray-400 outline-none"
              placeholder="Enter Stellar address or Federation address"
              onChange={handleChange}
            />
            {errors.wallet_address && (
              <p className="text-rose-600">This field is required</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">Amount to Withdraw</p>
            <div className="w-full bg-white p-3  rounded-md flex space-x-5">
              <input
                {...register("amount", { required: true })}
                placeholder="Enter amount to withdraw"
                className="w-full text-lg text-gray-500 placeholder-gray-400 outline-none"
                type="number"
                onChange={handleChange}
              />
            </div>
            {errors.amount && (
              <p className="text-rose-600">This field is required</p>
            )}
          </div>
          <div className="mt-10 bg-white text-lg text-gray-500 font-medium p-3 rounded-md inline-flex items-center w-full lg:max-w-md">
            <p className="flex-grow bg-transparent font-medium  outline-none">
              {fee} NGN
            </p>
            <p className="text-gray-500">Fee</p>
          </div>

          <div className="space-y-5 pt-5">
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-4xl lg:text-2xl font-medium" />
              <p className="text-black text-lg font-medium">
                Ensure the stellar address is the address associated with this
                account.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-[1.675rem] md:text-3xl lg:text-2xl font-medium" />
              <p className="text-black text-lg font-medium">
                Ensure you have at least 4 XLM in your account.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-[1.675rem] md:text-2xl font-medium" />
              <p className="text-black text-lg font-medium">
                Fees or withdrawal to stellar address/request: 5%
              </p>
            </div>
          </div>

          <div className="md:flex items-center justify-center pt-3">
            <button
              type="submit"
              className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
              onClick={handleSubmit(onSubmit)}
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

export default WithdrawalWallet;
