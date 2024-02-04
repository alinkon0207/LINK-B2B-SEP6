/* eslint-disable no-unused-vars */
import { useState } from "react";
import { NGN, Info } from "../assets/Images";
import NumberFormat from "react-number-format";
import { NetworkSelector } from "./NetworkSelector";
import { useSelector } from "react-redux";
import { selectNetwork } from "../features/networkInputSlice";
import { useMultichainWithdrawalMutation } from "../services/transactionApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import {
  selectCurrentUID,
  selectCurrentUser,
} from "../features/auth/authSlice";

export const BuyNGNC = () => {
  const [amount, setAmount] = useState(50000);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    linkTag: "",
    network_address: "",
  });

  const network = useSelector(selectNetwork);
  const navigate = useNavigate();
  const id = useSelector(selectCurrentUID);
  const user = useSelector(selectCurrentUser);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [multichain] = useMultichainWithdrawalMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await multichain({ id, user, ...formData, amount, network }).unwrap();
      setIsLoading(false);
      navigate({ pathname: "/success" });
    } catch (error) {
      setIsLoading(false);
      toast(error.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="space-y-1 relative">
            <div className="AmountInput ">
              <div>
                <NGN width={30} height={30} />
              </div>
              <NumberFormat
                value={amount}
                thousandSeparator={true}
                className=" outline-none text-4xl text-center md:text-4xl text-black font-semibold w-full bg-transparent"
                inputMode="numeric"
                onValueChange={(values, sourceInfo) => {
                  setAmount(values.value);
                }}
              />
            </div>
          </div>
          <p className="text-primary text-center font-semibold text-sm">
            ~ NGNC
          </p>
        </div>
        <div className="space-y-5">
          <div>
            <NetworkSelector />
          </div>

          {/* Network address */}

          {network === "Stellar" && (
            <div className="space-y-2">
              <label htmlFor="amount" className="text-slate-500 text-sm">
                Stellar address or Federation account to be credited
              </label>
              <div className="flex items-center bg-[#F3F4F6] p-3 space-x-1  rounded-md">
                <input
                  className=" outline-none text-lg text-gray-600 w-full bg-transparent"
                  placeholder=" Stellar address or Federation account"
                  name="network_address"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {network === "Solana" && (
            <div className="space-y-2">
              <label htmlFor="amount" className="text-slate-500 text-sm">
                Solana address
              </label>
              <div className="flex items-center bg-[#F3F4F6] p-3 space-x-1  rounded-md">
                <input
                  className=" outline-none text-lg text-gray-600 w-full bg-transparent"
                  placeholder="Enter Solana address"
                  name="network_address"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {network === "Polygon" && (
            <div className="space-y-2">
              <label htmlFor="amount" className="text-slate-500 text-sm">
                Polygon address
              </label>
              <div className="flex items-center bg-[#F3F4F6] p-3 space-x-1  rounded-md">
                <input
                  className=" outline-none text-lg text-gray-600 w-full bg-transparent"
                  placeholder="Enter Polygon address"
                  name="network_address"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {network === "Jarvis - JNGN (Polygon)" && (
            <div className="space-y-2">
              <label htmlFor="amount" className="text-slate-500 text-sm">
                Polygon address
              </label>
              <div className="flex items-center bg-[#F3F4F6] p-3 space-x-1  rounded-md">
                <input
                  className=" outline-none text-lg text-gray-600 w-full bg-transparent"
                  placeholder="Enter Polygon address"
                  name="network_address"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="amount" className="text-slate-500 text-sm">
              LINK Tag
            </label>
            <div className="flex items-center bg-[#F3F4F6] p-3 space-x-1  rounded-md">
              <input
                className=" outline-none text-lg text-gray-600 w-full bg-transparent"
                placeholder="Enter LINK Tag"
                name="linkTag"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Info width={25} height={25} />
              <p className="text-sm text-black">
                Ensure the network address is the address associated with this
                account.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Info width={25} height={25} />
              <p className="text-sm text-black">
                Ensure you have the minimum number of tokens on thee network.
              </p>
            </div>
          </div>

          <div className="bg-[#DBE7FF] py-2 px-3 text-primary rounded-md">
            <div className="grid grid-cols-2 gap-5 md:gap-10 items-center justify-between">
              <p className="font-medium text-base">1 NGN = 1 NGNC</p>
              <p className="text-sm lg:text-base">Exchange rate</p>
            </div>
            <div className="grid grid-cols-2 gap-5 md:gap-10 items-center justify-between">
              <p className="font-medium text-base">5%</p>
              <p className="text-sm lg:text-base">Fees</p>
            </div>
          </div>
          <div className="flex justify-center items-center pt-3">
            <button
              type="submit"
              className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
            >
              <span>Continue</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
