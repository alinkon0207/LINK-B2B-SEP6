/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { CgClose } from "react-icons/cg";
import { BsInfoCircle } from "react-icons/bs";
import NGN from "../../assets/flags/NGN-rectangle.svg";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { useStellarDepositMutation } from "../../services/stellarApi";
// import { selectCurrentUID } from "../../features/auth/authSlice";

const initialState = {
  amount: "",
  wallet_address: "",
  linkTag: "",
};

const Deposit = () => {
  const [deposit, setDeposit] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [fee, setFee] = useState(0);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // const uID = useSelector(selectCurrentUID);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeposit((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const search = useLocation().search;
  const transaction_id = new URLSearchParams(search).get("transaction_id");
  const asset_code = new URLSearchParams(search).get("asset_code");
  const transaction = new URLSearchParams(search).get("type");
  const token = new URLSearchParams(search).get("token");

  const [stellarDeposit] = useStellarDepositMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log(transaction);
      const transact = await stellarDeposit({
        // uID,
        transaction,
        transaction_id,
        ...data,
      }).unwrap();
      console.log(transact);
      toast(transact.message);
      navigate({
        pathname: "/request-status",
        search: `?asset_code=${asset_code}&transaction_id=${transaction_id}&amount=${deposit.amount}&fee=${fee}&type=${transaction}&token=${token}`,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(error.data);
    }
  };

  // calculating fee
  // const numCalc = (num) => {
  //   let newNum = num.toFixed(2);
  //   // let separator = newNum
  //   //   .toString()
  //   //   .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  //   return newNum;
  // };

  // Use Effect
  useEffect(() => {
    const newFee = deposit.amount * 0.05;
    setFee(newFee);
  }, [deposit.amount]);

  return (
    <>
      <Header cross="none" />
      <div className="max-w-[80%] md:max-w-[70%] mx-auto mb-10 sm:px-12 ">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-black text-3xl md:text-4xl font-semibold">
            Deposit
          </h1>
          <div
            onClick={window.close}
            className="flex items-center space-x-3 text-primary text-lg font-medium mb-3 cursor-pointer"
          >
            <span>Cancel</span>
            <CgClose className="text-2xl" />
          </div>
        </div>
        <form className="space-y-6 mt-8">
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">LINK Tag</p>
            <input
              {...register("linkTag", { required: true })}
              className="w-full bg-white text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 outline-none"
              placeholder="Enter your LINK Tag"
              onChange={handleChange}
            />
            {errors.linkTag && (
              <p className="text-rose-600">This field is required</p>
            )}
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-2xl lg:text-xl font-medium" />
              <p className="text-blue-700 text-md font-medium">
                If you don' have a LINK tag, you can create one by signup on{" "}
                <u>
                  <a href="https://app.linkio.africa/signup">LINK</a>
                </u>
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">
              Stellar address or Federation account to be credited
            </p>
            <input
              {...register("wallet_address", { required: true })}
              className="w-full bg-white text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 outline-none"
              placeholder="Enter Stellar address or Federation account"
              onChange={handleChange}
            />
            {errors.wallet_address && (
              <p className="text-rose-600">This field is required</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">Amount in Naira</p>
            <div className="w-full bg-white rounded-md flex space-x-20 p-3">
              <div className="flex items-center text-gray-500 font-normal text-lg space-x-3">
                <img className="w-9" src={NGN} alt="LINK Logo" />
                <p>NGN</p>
              </div>
              <input
                {...register("amount", { required: true })}
                className="w-full bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                type="number"
                placeholder="Enter amount"
                onChange={handleChange}
              />
            </div>
            {errors.amount && (
              <p className="text-rose-600">This field is required</p>
            )}
          </div>
          <div className="mt-10 bg-white text-lg text-gray-500 font-medium p-2 rounded-md inline-flex items-center w-full lg:max-w-md">
            <p className="flex-grow bg-transparent font-medium  outline-none">
              {fee} NGN
            </p>
            <p className="text-gray-500">Fee</p>
          </div>
          <div className="space-y-2 pt-5">
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-2xl lg:text-xl font-medium" />
              <p className="text-black text-md font-medium">
                Ensure stellar address is the address associated with this
                account.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-2xl lg:text-xl font-medium" />
              <p className="text-black text-md font-medium">
                Ensure you have a of minimum of 4 XLM in your Stellar wallet.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-2xl lg:text-xl font-medium" />
              <p className="text-black text-md font-medium">
                {" "}
                Fees on withdrawal to Stellar address request: 5%.
              </p>
            </div>
          </div>
          <div className="md:flex justify-center items-center pt-3">
            <button
              type="button"
              className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
              onClick={handleSubmit(onSubmit)}
            >
              <span>Request deposit</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Deposit;
