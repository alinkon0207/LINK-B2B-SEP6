/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Header } from "../../components";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../../services/userAuthAPi";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (password.newPassword !== password.confirmPassword)
      return setError(true);
    setError(false);
  }, [password]);

  const [resetPassword] = useResetPasswordMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const search = useLocation().search;
  const token = new URLSearchParams(search).get("q");
  const id = new URLSearchParams(search).get("d");
  const email = new URLSearchParams(search).get("e");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = await resetPassword({
        password: password.confirmPassword,
        token,
        id,
        email,
      }).unwrap();
      toast.success("Password reset success");
      // console.log(userData);
      navigate("/auth/login");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to reset password");
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
          <div className="text-center max-w-md mx-auto space-y-4">
            <h1 className="text-3xl text-black mb-3 font-bold">
              Reset Your Password
            </h1>
            <p className="text-gray-500 ">
              Please enter your new secured password.
            </p>
          </div>
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
            <span>Reset Password</span>
            {isLoading && <ImSpinner2 className="text-white animate-spin " />}
          </button>
        </form>
      </section>
    </>
  );
};
export default ResetPassword;
