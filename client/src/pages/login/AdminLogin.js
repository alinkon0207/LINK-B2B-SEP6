/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentToken,
  setCredentials,
} from "../../features/auth/authSlice";
import { useUserLoginAdminMutation } from "../../services/userAuthAPi";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useSelector(selectCurrentToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // testing redux-toolkit endpoint
  const [login] = useUserLoginAdminMutation();

  useEffect(() => {
    accessToken && navigate("/admin/dashboard");
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const userData = await login(data).unwrap();
      toast(userData.message);
      dispatch(setCredentials({ ...userData }));
      navigate("/admin/dashboard");
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
        <h1 className="text-3xl text-black">Login</h1>
        <form
          className="w-[75%] mb:w-[70%] space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 space-y-1">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
              Email address
            </label>
            <input
              {...register("email", { required: true })}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter email address"
              type="email"
            />
            {errors.email && (
              <p className="text-rose-500">Your email is required</p>
            )}
          </div>
          <div className="mb-4 space-y-1">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter password"
              type="password"
            />
            {errors.password && (
              <p className="text-rose-500">Your password is required</p>
            )}
          </div>
          <div className="md:flex justify-center items-center pt-3">
            <button className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer ">
              <span>Login</span>
              {isLoading && <ImSpinner2 className="text-white animate-spin " />}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <BsInfoCircle className="text-primary text-3xl lg:text-2xl font-medium" />
            <p className="text-black text-lg font-medium">
              Login To User Admin Dashboard.
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
