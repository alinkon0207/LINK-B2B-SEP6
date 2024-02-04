/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { BsInfoCircle } from "react-icons/bs";
import NGN from "../../assets/flags/NGN-rectangle.svg";
import { Header } from "../../components";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Connect from "@mono.co/connect.js";
import { selectCurrentLinkTag } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  transaction: "Deposit",
  amount: "",
};

const DepositMono = () => {
  const [deposit, setDeposit] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const ref = Math.random().toString(36).slice(2, 17);
  const ref2 = Math.random().toString(36).slice(2, 17);
  const [fee, setFee] = useState(0);

  useEffect(() => {
    calcFee(deposit.amountSent);
  }, [deposit.amountSent, fee]);

  useEffect(() => {
    calcAmtRecieve();
  }, [deposit.amountSent]);

  const calcFee = (amount) => {
    const fee = amount * 0.015;
    return setFee(fee);
  };

  const calcAmtRecieve = () => {
    const amount = parseInt(deposit.amountSent) - fee;
    return setValue(amount);
  };

  const navigate = useNavigate();
  const LinkTag = useSelector(selectCurrentLinkTag);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeposit((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "mono-sec-key": "live_sk_w0hC1N6stAF0h3xxzL20",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: deposit.amount * 100,
      type: "onetime-debit",
      description: "wallet deposit",
      reference: ref,
      redirect_url: "ngnc.online",
      meta: {
        reference: ref2,
      },
    }),
  };

  let response = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      response = await fetch(
        "https://api.withmono.com/v1/payments/initiate",
        options
      ).then((response) => response.json());
      console.log(response.payment_link);
      console.log(response.reference);
      console.log(response.amount);
      console.log(response.id);
      monoWidget.setup();
      monoWidget.open(response);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast(err.data);
    }
  };

  const monoWidget = new Connect({
    key: "live_pk_YE21jmzgAm5CvcTNZPAb",
    scope: "payments",
    data: {
      payment_id: response.id,
    },
    onSuccess: (chargeObject) =>
      console.log(`charged successfully`, chargeObject),
    onClose: () => setIsLoading(false),
  });

  // Use Effect
  useEffect(() => {
    setValue(deposit.amount);
  }, [deposit.amount]);

  return (
    <>
      <Header cross="none" />
      <div className="max-w-[90%] md:max-w-[60%] mx-auto mb-10 sm:px-12 ">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-black text-3xl md:text-5xl font-semibold">
            Deposit
          </h1>
          <div
            onClick={() => navigate("/user/dashboard")}
            className="flex items-center space-x-3 text-primary text-lg font-medium mb-3 cursor-pointer"
          >
            <span>Cancel</span>
            <CgClose className="text-2xl" />
          </div>
        </div>

        <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <p className="text-gray-500 text-lg">Amount in Naira</p>
            <div className="w-full bg-white rounded-md flex space-x-20 p-3">
              <div className="flex items-center text-gray-500 font-normal text-lg space-x-3">
                <img className="w-9" src={NGN} alt="LINK Logo" />
                <p>NGN</p>
              </div>
              <input
                className="w-full bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                type="number"
                placeholder="0.00"
                onChange={handleChange}
                name="amountSent"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <BsInfoCircle className="text-primary text-2xl lg:text-2xl font-medium" />
              <p className="text-black text-lg font-medium">
                Please enter amount between 50,000 to 1,000,000
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-gray-500 text-lg">Amount you will receive</p>
            <div className="mt-10 bg-white text-lg text-gray-500 font-medium p-3 pr-5 rounded-md flex justify-between items-center w-full space-x-4">
              <div className="flex">
                <img className="w-9 mr-4" src={NGN} alt="LINK Logo" />
                <p className="mr-14">NGN</p>
                <p>{value}</p>
              </div>
              <p className="text-gray-500">Fee: {fee}</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-gray-500 text-lg">Payment Method</p>
            <div className="mt-10 bg-white text-lg text-gray-500 font-medium p-3 rounded-md inline-flex items-center w-full">
              <p className="text-gray-500 font-bold">Mono Direct Debit</p>
            </div>
          </div>
          <div className="md:flex justify-center items-center pt-3">
            <button
              type="submit"
              className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
            >
              <span>Continue</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DepositMono;
