/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Header } from "../../components";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUID,
  selectCurrentToken,
  selectCurrentAccLock,
  logOut,
} from "../../features/auth/authSlice";
import { useUpdatePasswordMutation } from "../../services/userAuthAPi";

export default function ChangePassword() {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uID = useSelector(selectCurrentUID);
  const accessToken = useSelector(selectCurrentToken);
  const accLock = useSelector(selectCurrentAccLock);

  useEffect(() => {
    if (password.newPassword !== password.confirmPassword)
      return setError(true);
    setError(false);
  }, [password]);

  // useEffect(() => {
  //   if (accessToken && !accLock) navigate("/user/dashboard");
  //   navigate("/auth/login");
  // });

  const [updatePassword] = useUpdatePasswordMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = await updatePassword({ uID, ...data }).unwrap();
      toast(userData.message);
      dispatch(logOut());
      navigate("/auth/login");
    } catch (error) {
      setIsLoading(false);
      toast(error.data);
    }
  };

  return (
    <>
      <Header />
      <section className="w-[90%] mb:w-[80%] mx-auto">
        <form
          className="space-y-5 mt-16 sm:max-w-sm mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-slate-600">
            In order to secure your account better you are required to reset
            your password on first Login
          </p>
          <div className="space-y-3">
            <p className="text-gray-500 text-lg">New Password</p>
            <div className="w-full bg-white rounded-md flex space-x-20 ">
              <input
                {...register("newPassword", { required: true })}
                className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                type="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-gray-500 text-lg">Confirm Password</p>
            <div className="w-full bg-white rounded-md flex space-x-20 ">
              <input
                {...register("confirmPassword", { required: true })}
                className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                type="password"
                onChange={handleChange}
              />
            </div>
            {error && (
              <div className=" text-amber-400 flex items-center justify-center space-x-2">
                <p>
                  <IoWarningOutline />
                </p>
                <p>Both passwords must match</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full text-white font-normal text-base mb-1 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer"
          >
            <span>Change Password</span>
            {isLoading && <ImSpinner2 className="text-white animate-spin " />}
          </button>
        </form>
      </section>
    </>
  );
}
