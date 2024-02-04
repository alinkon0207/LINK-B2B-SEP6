/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navigation } from "../../components";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  selectCurrentToken,
} from "../../features/auth/authSlice";
import { useUserLoginMutation } from "../../services/userAuthAPi";

const BusinessLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useSelector(selectCurrentToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    accessToken && navigate("/user/dashboard");
  });

  const [login] = useUserLoginMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const userData = await login(data).unwrap();
      toast(userData.message);
      dispatch(setCredentials({ ...userData }));
      navigate("/user/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(error.data);
    }
  };

  return (
    <div className="bg-black h-screen">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <main className="flex flex-col items-center justify-center space-y-12 bg-[#292929] rounded-md py-10 max-w-xl shadow-sm w-[90%] mx-auto my-20 mb:my-32">
        <h1 className="text-3xl text-white">Login</h1>
        <form
          className="w-[75%] mb:w-[70%] space-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 space-y-2">
            <label className="block text-white text-md mb-2" htmlFor="email">
              Email address
            </label>
            <input
              {...register("email", { required: true })}
              className="w-full border border-white bg-transparent text-lg text-white p-2 rounded-md placeholder-white font-extralight outline-none"
              placeholder="Enter email address"
              type="email"
            />
            {errors.email && (
              <p className="text-rose-500">Your email is required</p>
            )}
          </div>
          <div className="mb-6 space-y-2">
            <label className="block text-white text-md mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className="w-full border border-white bg-transparent text-lg text-white p-2 rounded-md placeholder-white font-extralight outline-none"
              placeholder="Enter your password"
              type="password"
            />
            {errors.password && (
              <p className="text-rose-500">Your password is required</p>
            )}
          </div>
          <div className="md:flex justify-center items-center pt-3">
            <button className="bg-primary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-blue-400 transition duration-200 ease-out cursor-pointer ">
              <span>Login</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
          <p className="text-center">
            <span>
              <a href="/user/forgot-password" className="text-primary text-lg">
                I forgot my password
              </a>
            </span>
          </p>
          {/* <p className="text-center">
            If you don't have an account,{" "}
            <span>
              <a href="/user/kyb" className="text-primary text-lg">
                request one
              </a>
            </span>
          </p> */}
        </form>
      </main>
    </div>
  );
};

export default BusinessLogin;
