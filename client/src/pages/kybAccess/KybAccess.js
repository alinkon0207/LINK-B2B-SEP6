/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { Header } from "../../components";
import { useRequestKYBMutation } from "../../services/userAuthAPi";

const KybAccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [requestKYB] = useRequestKYBMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const userData = await requestKYB(data).unwrap();
      toast(userData.message);
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(error.data);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center space-y-12 bg-white rounded-md py-10 max-w-xl shadow-sm w-[90%] mx-auto my-20 mb:my-32">
        <h1 className="text-3xl text-black">Request KYB access</h1>
        <form
          className="w-[75%] mb:w-[70%] space-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 space-y-1">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
              Business name
            </label>
            <input
              {...register("businessName", { required: true })}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter business name"
            />
            {errors.businessName && (
              <p className="text-rose-500">Your business name is required</p>
            )}
          </div>
          <div className="mb-4 space-y-1">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
              Contact mail
            </label>
            <input
              {...register("contactMail", { required: true })}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter contact mail"
            />
            {errors.contactMail && (
              <p className="text-rose-500">Your contact mail is required</p>
            )}
          </div>

          <div className="md:flex justify-center items-center pt-3">
            <button className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer ">
              <span>Request KYB</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default KybAccess;
