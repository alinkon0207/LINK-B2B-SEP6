/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NGN from "../../assets/flags/NGN-round.svg";
import { Navbar } from "../../components";
import TransferNgnPopup from "../../components/modal/TransferNgnPopup";
import {
  selectCurrentAccMode,
  selectCurrentUID,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { useCreateWalletMutation } from "../../services/accountApi";
import "./NgnAccount.css";

const NgnAccount = () => {
  const [newBalance, setNewBalance] = useState("10,000,000.00");
  const navigate = useNavigate();
  const location = useLocation();
  const [newWallet] = useCreateWalletMutation();
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const { accountName, accountNumber, accountType, balance, bankName } =
    location.state;

  const userName = useSelector(selectCurrentUser);
  const userId = useSelector(selectCurrentUID);
  const mode = useSelector(selectCurrentAccMode);

  const handleOpenTransferModal = () => {
    setOpenTransferModal(true);
  };

  const handleCloseTransferModal = () => {
    setOpenTransferModal(false);
  };
  console.log(123);

  const firstName = userName.split(" ")[0];

  // Use Effect
  useEffect(() => {
    const newBalance = numCalc(balance);
    setNewBalance(newBalance);
  }, [balance]);

  // calculating fee
  const numCalc = (num) => {
    let newNum = num.toFixed(2);
    return newNum;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitToast = toast.loading("Requesting...");

    try {
      const resolve = await newWallet({
        userId,
        firstName,
      }).unwrap();
      toast.success(resolve.message, {
        id: submitToast,
      });
      // navigate('/');
    } catch (error) {
      toast.error(error.data.message, {
        id: submitToast,
      });
      console.error(error.data.message);
    }
  };

  return (
    <>
      <div className="mb-24 md:mb-32">
        <Navbar />
      </div>

      <main className="w-[90%] lg:w-[80%] mx-auto my-10 ">
        <Link
          to="/user/dashboard"
          className="flex items-center space-x-3 text-primary text-xl font-medium mb-5 back rounds"
        >
          <BsArrowLeft className="text-xl font-bold" />
          <span className="block">Go back</span>
        </Link>

        <div className="rounds2">
          <div className="flex justify-between items-center details space-x-6 mb-16">
            <h1 className="text-black text-2xl lg:text-3xl font-semibold">
              Your NGN account details
            </h1>
            <img
              className="block "
              style={{
                height: "3rem",
                width: "auto",
              }}
              src={NGN}
              alt="flag"
            />
          </div>
          <section className="grid grid-cols-1 lg:grid-cols-2">
            <div className="rounds3">
              <div className="flex items-center justify-between rate">
                <div className="space-y-1">
                  <h1 className="text-black text-3xl lg:text-4xl font-semibold">
                    {newBalance}
                  </h1>
                  <p className="text-gray-500 text-lg">Nigerian Naira</p>
                </div>
              </div>
              <div className="w-full md:w-[80%]">
                <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row d:justify-between lg:justify-start mt-12 md:space-x-5 lg:space-x-0  xl:space-x-2 action">
                  <button
                    className={
                      "cursor-pointer bg-secondary justify-center flex items-center text-white px-10 py-3 rounded-md text-lg w-full mb-8 space-x-4"
                    }
                    onClick={() =>
                      navigate("/deposit/pay-method", { state: location.state })
                    }
                  >
                    <Deposit
                      className="w-8 h-8 lg:w-8 lg:h-8"
                      aria-hidden="true"
                    />
                    <span> Deposit</span>
                  </button>
                  <button
                    className={
                      "cursor-pointer bg-black justify-center flex items-center text-white px-10 py-3 rounded-md text-lg w-full  mb-8 space-x-4"
                    }
                    onClick={() => navigate("/withdraw/pay-method")}
                  >
                    <Withdraw className="w-6 h-6" aria-hidden="true" />
                    <span>Withdraw</span>
                  </button>
                </div>
                <div>
                  <button
                    className={
                      "cursor-pointer bg-primary justify-center flex items-center text-white px-10 py-3 rounded-md text-lg w-full mb-8 space-x-4"
                    }
                    onClick={handleOpenTransferModal}
                    // onClick={() =>
                    //   navigate('/transfer', { state: location.state })
                    // }
                  >
                    <Transfer className="w-6 h-6" aria-hidden="true" />
                    <span>Transfer</span>
                  </button>
                </div>
                <TransferNgnPopup
                  isOpen={openTransferModal}
                  closeModal={handleCloseTransferModal}
                  balance={balance}
                  accNum={accountNumber}
                />
              </div>
            </div>
            <div className="space-y-5 info rounds4 text-black">
              <div className="row">
                <p className="text-gray-500 text-lg">Account holder</p>
                <h1 className="text-black text-lg font-semibold capitalize tracking-wider">
                  {accountName}
                </h1>
              </div>
              <div className="row">
                <p className="text-gray-500 text-lg">Account number</p>
                <h1 className="text-black text-lg font-semibold capitalize tracking-widest">
                  {accountNumber}
                </h1>
              </div>
              <div className="row">
                <p className="text-gray-500 text-lg">Bank name</p>
                <h1 className="-black text-lg font-semibold capitalize tracking-wider">
                  {bankName}
                </h1>
              </div>
              {/* <div className="row">
                <p className="text-gray-500 text-lg">Bank address</p>
                <h1 className="text-black text-lg font-semibold capitalize tracking-wide">
                  {bankAddress}
                </h1>
              </div> */}
              <div className="row">
                <p className="text-gray-500 text-lg">Account type</p>
                <h1 className="text-black text-lg font-semibold capitalize tracking-wider">
                  {accountType}
                </h1>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default NgnAccount;

function Deposit(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.1663 16.9995C31.1663 24.8195 24.8197 31.1662 16.9997 31.1662C9.17967 31.1662 2.83301 24.8195 2.83301 16.9995C2.83301 9.17949 9.17967 2.83282 16.9997 2.83282"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.1938H22.3173"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.1562 22.3884V11.9995"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Withdraw(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.1663 18C31.1663 25.82 24.8197 32.1666 16.9997 32.1666C9.17967 32.1666 2.83301 25.82 2.83301 18C2.83301 10.18 9.17967 3.83331 16.9997 3.83331"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 18L32.4902 2.5108"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.0001 10.0669V1H24.9326"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Transfer(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.4665 11.2425L12.709 15.0075"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.7168 11.2425H16.4668"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.7168 6.75749L7.4743 2.99249"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4668 6.75751H3.7168"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
