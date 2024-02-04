/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Header } from "../../components";
import { useForgotPasswordMutation } from "../../services/userAuthAPi";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [forgetPassword, setForgetPassword] = useState({
    email: "",
    linkTag: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgotPassword] = useForgotPasswordMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForgetPassword((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = await forgotPassword({ ...data }).unwrap();
      toast.success(userData.message);
      navigate("/auth/login");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center space-y-8 bg-white rounded-md py-10 w-full max-w-xl shadow-sm lg:w-[90%] mx-auto ">
        <div className="text-center max-w-md mx-auto space-y-4">
          <h1 className="text-3xl text-black mb-3 font-bold">
            Forgot Your Password?
          </h1>
          <p className="text-gray-500 ">
            Enter the linkTag associated with your account and a link to reset
            your password will be sent to you shortly.
          </p>
        </div>
        <form className="w-[70%] space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="mb-4 space-y-1">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter business name"
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-rose-500">Your email is required</p>
            )}
          </div> */}
          <div className="mb-4 space-y-1">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
              LINK Tag
            </label>
            <input
              {...register("linkTag", { required: true })}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter LINK Tag"
              onChange={handleChange}
            />
            {errors.linkTag && (
              <p className="text-rose-500">Your LINK Tag is required</p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
            >
              <span>Continue</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
          <p className="text-center">
            <span>
              <a
                href="/auth/login"
                className="text-primary text-lg font-medium"
              >
                Return to Login
              </a>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
