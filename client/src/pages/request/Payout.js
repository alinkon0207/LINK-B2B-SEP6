/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components';
import { ImSpinner2 } from 'react-icons/im';
import axios from 'axios';

const Request = () => {
  const [isLoading, setIsLoading] = useState(false);
  const search = useLocation().search;
  const transaction_id = new URLSearchParams(search).get('transaction_id');
  const asset_code = new URLSearchParams(search).get('asset_code');
  const amount = new URLSearchParams(search).get('amount');
  const token = new URLSearchParams(search).get('token');
  const type = new URLSearchParams(search).get('type');
  const wallet_id = new URLSearchParams(search).get('wallet_id');
  const account_name = new URLSearchParams(search).get('account_name');
  const account_number = new URLSearchParams(search).get('account_number');
  const HexValue = new URLSearchParams(search).get('Hex');
  const fee = new URLSearchParams(search).get('fee');
  const callback = 'postmessage';

  const externalId = Math.floor(Math.random() * 9999999);
  const newAmount = amount;
  const fixedAmount = fee;

  let config = {
    withCredentials: true,
    origin: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      transaction_id: transaction_id,
      asset_code: asset_code,
      amount: newAmount,
      amount_fee: fixedAmount,
      memo_type: 'text',
      hashed: HexValue,
      callback: 'postmessage',
      externalId: externalId,
    },
  };

  // Function to close the popup window
  function closePopup() {
    // Send a message to the opener window to indicate completion
    window.opener.postMessage('success', '*');

    // Close the popup window
    window.close();
  }

  const validateRequest = async () => {
    setIsLoading(true);
    try {
      let data = await axios.get(
        `https://anchor.ngnc.online/sep24/transactions/${type}/interactive/complete`,
        config
      );
      if (data.status === 200) {
        window.location.replace(
          `https://anchor.ngnc.online/sep24/transaction/more_info?id=${transaction_id}&callback=${callback}`
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Header cross="none" />
      <div className="flex flex-col items-center justify-center space-y-8 w-[80%] mx-auto my-10">
        <div className="bg-white rounded px-10 py-8 space-y-5 w-96">
          <div className="mx-auto w-[30%]">
            <div className="bg-secondary text-white rounded-full p-4 inline-flex ">
              <Logo width={40} height={40} />
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
            <h1 className="text-black text-sm font-semibold">Transaction Id</h1>
            <p className="capitalize text-gray-600 font-medium text-sm">
              {transaction_id}
            </p>
          </div>
          <div>
            <h1 className="text-black text-sm font-semibold">{type} Amount</h1>
            <p className="capitalize text-gray-600 font-medium text-sm">
              {newAmount} NGN
            </p>
          </div>
          {wallet_id !== null ? (
            <div>
              <h1 className="text-black text-sm font-semibold">wallet_id</h1>
              <p className="text-gray-600 font-medium text-sm">{wallet_id}</p>
            </div>
          ) : (
            ''
          )}
          {account_name !== null ? (
            <div>
              <h1 className="text-black text-sm font-semibold">Account Name</h1>
              <p className="text-gray-600 font-medium text-sm">
                {account_name}
              </p>
            </div>
          ) : (
            ''
          )}
          {account_number !== null ? (
            <div>
              <h1 className="text-black text-sm font-semibold">
                Account Number
              </h1>
              <p className="text-gray-600 font-medium text-sm">
                {account_number}
              </p>
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
                We have received your request. Waiting for funds to be sent to
                account
              </p>
            ) : (
              <p className="text-gray-600 font-medium text-sm md:text-sm">
                We have received your request. We would make a bank deposit to
                the account provided.
              </p>
            )}
          </div>
          <p className="text-black font-semibold text-center mt-3 text-sm md:text-sm"></p>
        </div>
        <div className="pt-6">
          <button
            className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-xl mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
            onClick={validateRequest}
          >
            <span>Confirm</span>
            {isLoading && <ImSpinner2 className="text-white animate-spin " />}
          </button>
        </div>
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

//  window.location.replace(
//    `https://anchor.ngnc.online/sep24/transactions/${type}/interactive/complete`,
//    config
//  );
