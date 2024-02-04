/* eslint-disable no-unused-vars */
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';

const Request = () => {
  const [isLoading, setIsLoading] = useState(false);

  const search = useLocation().search;
  const transaction_id = new URLSearchParams(search).get('transaction_id');
  const asset_code = new URLSearchParams(search).get('asset_code');
  const amount = new URLSearchParams(search).get('amount');
  const token = new URLSearchParams(search).get('token');
  const type = new URLSearchParams(search).get('type');
  const fee = new URLSearchParams(search).get('fee');

  const newAmount = amount;
  let response;

  let config = {
    withCredentials: true,
    origin: true,
    headers: {
      // token from polaris generated for validating transaction
      Authorization: `${token}`,
    },
    params: {
      transaction_id: transaction_id,
      asset_code: asset_code,
      amount: amount,
    },
  };

  const validateRequest = async () => {
    // e.preventDefault();
    // setIsLoading(true);
    try {
      type === 'deposit'
        ? (response = await axios.get(
            `https://anchor.ngnc.online/sep24/transactions/deposit/interactive/complete`,
            config
          ))
        : (response = await axios.get(
            `https://anchor.ngnc.online/sep24/transactions/withdraw/interactive/complete`,
            config
          ));
      console.log(response);
      // setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const closePage = () => {
    setIsLoading(true);
    setTimeout(function () {
      window.close();
    }, 2000);
  };

  useEffect(() => {
    validateRequest();
    console.log('Request Sent');
  });

  return (
    <>
      <Header cross="none" />
      <div className="flex flex-col items-center justify-center space-y-8 w-[80%] mx-auto my-10">
        <div className="bg-white rounded px-10 py-8 space-y-5 w-96">
          <div className="mx-auto w-[30%]">
            <div className="bg-secondary text-white rounded-full p-4 inline-flex ">
              <Logo width={30} height={30} />
            </div>
          </div>
          <div>
            <h1 className="text-black text-sm font-semibold">
              Transaction type
            </h1>
            <p className="capitalize text-gray-600 font-medium text-sm">
              {type}
            </p>
          </div>
          <div>
            <h1 className="text-black text-sm font-semibold">Transaction ID</h1>
            <p className="capitalize text-gray-600 font-medium text-sm">
              {transaction_id}
            </p>
          </div>
          <div>
            <h1 className="text-black text-sm font-semibold">Amount:</h1>
            <p className="text-gray-600 font-medium text-sm">{newAmount} NGN</p>
          </div>
          {fee !== null ? (
            <div>
              <h1 className="text-black text-sm font-semibold">Deposit Fee</h1>
              <p className="text-gray-600 font-medium text-sm">{fee} NGN</p>
            </div>
          ) : (
            ''
          )}
          <div>
            <h1 className="text-black text-sm font-semibold">
              Transaction Status
            </h1>
            {type === 'deposit' ? (
              <p className="text-gray-600 font-medium text-sm md:text-sm">
                Waiting for funds to be pulled from link wallet
              </p>
            ) : (
              <p className="text-gray-600 font-medium text-sm md:text-sm">
                Waiting for NGNC to be sent to designated address
              </p>
            )}
          </div>
          <div>
            <h1 className="text-black text-sm font-semibold">Update</h1>
            {type === 'deposit' ? (
              <p className="text-gray-600 font-medium text-sm md:text-sm">
                We have received your request. NGNC should be deposited in your
                wallet shortly
              </p>
            ) : (
              <p className="text-gray-600 font-medium text-sm md:text-sm">
                We have received your request. NGN should be deposited in your
                wallet shortly.
              </p>
            )}
          </div>
          <p className="text-black font-semibold text-center mt-3 text-sm md:text-sm">
            Click back arrow button to close this window and track the
            transaction progress from within your wallet.
          </p>
        </div>
        {/* <div className="md:flex justify-center items-center pt-3">
          <button
            className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
            onClick={closePage}
          >
            <span>Close Page</span>
            {isLoading && <ImSpinner2 className="text-white animate-spin " />}
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Request;

function Logo({ width, height }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 76 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.77051 26.9999L27.2313 48.4607L70.2288 5.53906"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
