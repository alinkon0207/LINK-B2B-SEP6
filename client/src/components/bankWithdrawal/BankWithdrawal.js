/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "..";

const BankWithdrawal = () => {
  const [section2Date, setSection2Data] = useState({
    accountName: "",
    accountNumber: 0,
    amount: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSection2Data((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="">
        <a
          href="/"
          className="flex items-center space-x-3 text-primary text-xl font-medium mb-5"
        >
          <BsArrowLeft className="text-2xl" /> <span>Go back</span>
        </a>
      </div>

      <h1 className="text-black text-5xl font-semibold">
        Bank account withdrawal
      </h1>

      <form action="" className="space-y-8 mt-14">
        <div className="space-y-4">
          <p className="text-gray-500 text-lg">Account name</p>
          <input
            type="text"
            name="accountName"
            id=""
            onChange={handleChange}
            className="w-full bg-white text-lg text-gray-500 p-3 rounded-md placeholder-gray-500 outline-none"
            placeholder="Enter account name"
          />
        </div>
        <div className="space-y-4">
          <p className="text-gray-500 text-lg">Account number</p>
          <input
            type="number"
            name="accountNumber"
            id=""
            onChange={handleChange}
            className="w-full bg-white text-lg text-gray-500 p-3 rounded-md placeholder-gray-500 outline-none"
            placeholder="Enter account number"
          />
        </div>
        <div className="space-y-4">
          <p className="text-gray-500 text-lg">Amount</p>
          <input
            type="number"
            name="amount"
            id=""
            onChange={handleChange}
            className="w-full bg-white text-lg text-gray-500 p-3 rounded-md placeholder-gray-500 outline-none"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex items-center justify-center pt-3">
          <Button
            bgColor="bg-secondary"
            ringColor="ring-green-300"
            text="Request withdrawal"
            paddingX="px-16"
            spinner={true}
          />
        </div>
      </form>
    </div>
  );
};

export default BankWithdrawal;
