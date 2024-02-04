/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { useNewUserMutation } from "../../services/userAuthAPi";
import { BsArrowLeft } from "react-icons/bs";
import RegisterLogo from "../../assets/register.svg";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [newUser] = useNewUserMutation();

  const onSubmit = async (data) => {
    const submitToast = toast.loading("Requesting...");
    try {
      const userData = await newUser(data).unwrap();
      toast.success(userData.message, {
        id: submitToast,
      });
      navigate("/admin/dashboard");
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
      <div>
        {/* <div>
          <div className="w-[90%] mb:w-[80%] mx-auto mt-5 mb-10 cursor-pointer">
            <Logo />
          </div>
        </div> */}
        <div className=" bg-white rounded-md py-10 max-w-xl shadow-sm w-[90%] mx-auto my-20 mb:my-32">
          <div className="flex items-center px-16 space-x-20 pb-10">
            <div
              className="space-x-3 text-primary text-xl cursor-pointer"
              onClick={() => navigate("/admin/dashboard")}
            >
              <BsArrowLeft className="text-3xl" />
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="h-[35px] w-[35px]">
                <img src={RegisterLogo} alt={RegisterLogo} />
              </div>
              <h1 className="text-2xl font-semibold text-black italic">
                Register business
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center  space-y-12">
            <form
              className="w-[75%] mb:w-[70%] space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* The Basic require info on New user's */}

              <div className="mb-4 space-y-1">
                <label
                  className="block text-gray-700 text-lg mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  {...register("firstName", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-rose-500">A name is required</p>
                )}
              </div>
              <div className="mb-4 space-y-1">
                <label
                  className="block text-gray-700 text-lg mb-2"
                  htmlFor="name"
                >
                  Second Name
                </label>
                <input
                  {...register("lastName", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter second name"
                />
                {errors.name && (
                  <p className="text-rose-500">A name is required</p>
                )}
              </div>
              <div className="mb-4 space-y-1">
                <label
                  className="block text-gray-700 text-lg mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter email"
                  type="email"
                />
                {errors.email && (
                  <p className="text-rose-500">An email is required</p>
                )}
              </div>
              <div className="mb-4 space-y-1">
                <label
                  className="block text-gray-700 text-lg mb-2"
                  htmlFor="linkTag"
                >
                  LINK Tag
                </label>
                <input
                  {...register("linkTag", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter LINK Tag"
                />
                {errors.name && (
                  <p className="text-rose-500">A LINK Tag is required</p>
                )}
              </div>
              {/* <div className="mb-4 space-y-1">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="bvn">
              BVN Number
            </label>
            <input
              {...register('bvn')}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter BVN Number"
            />
          </div> */}
              <div className="mb-4 space-y-1">
                <label
                  className="block text-gray-700 text-lg mb-2"
                  htmlFor="phone-number"
                >
                  phone Number
                </label>
                <input
                  {...register("phone", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter Phone Number"
                />
                {errors.name && (
                  <p className="text-rose-500">
                    Users Phone Number is required
                  </p>
                )}
              </div>
              <div className="mb-4 space-y-1">
                <label className="block text-gray-700 text-lg mb-2">
                  Address
                </label>
                <input
                  {...register("street", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter address"
                />
                {errors.name && (
                  <p className="text-rose-500">Address is required</p>
                )}
              </div>
              <div className="mb-4 space-y-1">
                <label className="block text-gray-700 text-lg mb-2">
                  State
                </label>
                <input
                  {...register("state", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter state"
                />
                {errors.name && (
                  <p className="text-rose-500">State is required</p>
                )}
              </div>
              <div className="mb-4 space-y-1">
                <label className="block text-gray-700 text-lg mb-2">City</label>
                <input
                  {...register("city", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter city"
                />
                {errors.name && (
                  <p className="text-rose-500">City is required</p>
                )}
              </div>
              <div className="mb-4 space-y-1">
                <label
                  className="block text-gray-700 text-lg mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
                  placeholder="Enter password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-rose-500">A password is required</p>
                )}
              </div>
              {/* <div className="mb-4 space-y-1">
            <label className="block text-gray-700 text-lg mb-2" htmlFor="name">
              Account Name
            </label>
            <input
              {...register("accountname", { required: true })}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter Bank Account name"
            />
            {errors.name && <p className="text-rose-500">A name is required</p>}
          </div>
          <div className="mb-4 space-y-1">
            <label
              className="block text-gray-700 text-lg mb-2"
              htmlFor="number"
            >
              Account Number
            </label>
            <input
              {...register("accountnumber", { required: true })}
              className="w-full border bg-transparent text-lg text-gray-500 p-2 rounded-md placeholder-gray-400 font-extralight outline-none"
              placeholder="Enter Account Number"
            />
            {errors.name && (
              <p className="text-rose-500">Users Account Number is required</p>
            )}
          </div> */}
              <div className="md:flex justify-center items-center pt-3">
                <button className="bg-secondary px-16 py-2 capitalize flex items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-green-400 transition duration-200 ease-out cursor-pointer ">
                  <span>Register</span>
                  {isLoading && (
                    <ImSpinner2 className="text-white animate-spin " />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

function Logo() {
  return (
    <svg
      width="100"
      height="30"
      viewBox="0 0 121 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96.4629 21.0598C96.9113 20.4158 114.376 0.715508 115.132 0H120.41C120.521 0.270303 120.34 0.381604 120.23 0.500855C119.262 1.61387 118.278 2.72688 117.303 3.83989L102.882 20.2568L102.316 20.9326C102.393 21.2574 102.569 21.5494 102.82 21.7673L107.831 28.1274L120.576 44.2184C120.762 44.4022 120.907 44.6246 121 44.8703C119.147 45.0146 117.287 45.0385 115.431 44.9418C115.148 44.7237 114.907 44.4541 114.723 44.1468L105.014 31.8957L97.0136 21.7991C96.8326 21.5686 96.6596 21.3301 96.4629 21.0598Z"
        fill="#182CD1"
      />
      <path
        d="M25.871 0.0556506C26.1463 0.0556506 26.3509 0 26.5554 0H30.489C30.5362 0 30.5913 0.0477005 30.6385 0.0795008C30.6857 0.111301 30.7171 0.174902 30.7171 0.230552C30.7171 14.9382 30.7171 29.6485 30.7171 44.3615C30.7171 44.5046 30.7171 44.6477 30.6699 44.8305C30.265 44.9227 29.8481 44.9495 29.4348 44.91C29.0257 44.91 28.6088 44.91 28.1997 44.91C27.7906 44.91 27.413 44.91 27.0511 44.91C26.6463 44.9484 26.2382 44.927 25.8395 44.8464C25.7943 44.7618 25.7625 44.6706 25.7451 44.5761C25.7451 29.8685 25.7451 15.1555 25.7451 0.437255C25.7792 0.307532 25.8212 0.180084 25.871 0.0556506Z"
        fill="#182CD1"
      />
      <path
        d="M74.6625 0C76.2359 0 77.8094 0 79.3828 0C79.4202 0.183712 79.4465 0.36956 79.4615 0.556506C79.4733 0.765688 79.4733 0.97538 79.4615 1.18456V43.7255C79.4615 44.0832 79.4615 44.433 79.4615 44.8146C79.3454 44.8636 79.2239 44.8983 79.0996 44.918H74.8907C74.7964 44.9054 74.7039 44.8814 74.6153 44.8464C74.5744 44.7088 74.5455 44.5678 74.5288 44.4251C74.5288 44.1309 74.5288 43.8288 74.5288 43.5347C74.5288 29.463 74.5288 15.394 74.5288 1.32766C74.4732 0.880586 74.519 0.426597 74.6625 0V0Z"
        fill="#182CD1"
      />
      <path
        d="M46.168 44.8385C44.5689 44.9713 42.9625 44.9873 41.3612 44.8862C41.3089 44.7334 41.2695 44.5765 41.2432 44.4171C41.2432 44.1468 41.2432 43.8765 41.2432 43.6221C41.2432 29.5187 41.2432 15.4205 41.2432 1.32766C41.2432 0.93811 41.2432 0.532656 41.2432 0.143102C41.3889 0.0766913 41.5421 0.0286305 41.6995 0L45.7589 0C45.8791 0.0107096 45.9979 0.034703 46.1129 0.0715508C46.1433 0.191615 46.1643 0.313886 46.1759 0.437255L46.168 44.8385Z"
        fill="#182CD1"
      />
      <path
        d="M94.165 44.8305C92.5663 44.97 90.9596 44.9886 89.3582 44.8862C89.3086 44.7305 89.2718 44.5709 89.248 44.4091C89.248 44.1388 89.248 43.8765 89.248 43.6141V1.3197C89.248 0.930144 89.248 0.52469 89.248 0.127186C89.4191 0.0689669 89.5958 0.028999 89.7751 0.00793457H93.6615C93.7935 0.0152546 93.9249 0.031188 94.0549 0.0556351C94.0973 0.218065 94.1314 0.382582 94.1571 0.54854C94.1571 0.787043 94.1571 1.02555 94.1571 1.26405V44.8305H94.165Z"
        fill="#182CD1"
      />
      <path
        d="M0.160976 0H4.88126C4.92667 0.115645 4.96092 0.235453 4.98353 0.357754C4.98353 12.0762 4.98353 23.7973 4.98353 35.521C4.9682 35.6149 4.93903 35.706 4.89699 35.7913C4.79426 35.8362 4.6856 35.8656 4.57444 35.8787H0.34192C0.262926 35.858 0.188297 35.823 0.12164 35.7754C0.0847422 35.6943 0.0583019 35.6088 0.0429688 35.521V0.365704C0.0675144 0.239426 0.10714 0.116626 0.160976 0V0Z"
        fill="#182CD1"
      />
      <path
        d="M50.046 12.8235C49.9516 10.669 49.991 8.53042 49.9831 6.39185C49.9906 6.28214 50.0063 6.17317 50.0303 6.0659C50.3371 6.0182 50.4079 6.2567 50.5259 6.3998C51.824 7.98982 53.1142 9.63548 54.4044 11.2494L69.9263 30.6635L70.713 31.6334V38.5976C70.4534 38.7089 70.3905 38.4784 70.3039 38.3591C69.1711 36.952 68.0539 35.5369 66.9289 34.1217L50.5967 13.5151L50.046 12.8235Z"
        fill="#182CD1"
      />
      <path
        d="M19.8444 44.8623C19.0026 44.9816 0.861008 44.9736 0.11363 44.8623C0.0783989 44.7264 0.0521175 44.5883 0.0349585 44.4489C-0.0345517 42.9802 -0.000374185 41.5084 0.137231 40.0446C0.27884 40.0446 0.44405 39.981 0.609259 39.9651C0.774469 39.9492 0.96328 39.9651 1.13636 39.9651H18.7666C19.1312 39.9312 19.4989 39.9635 19.8523 40.0605C19.8949 40.1954 19.9265 40.3337 19.9467 40.4739C20.0274 41.9371 19.9932 43.4045 19.8444 44.8623Z"
        fill="#182CD1"
      />
    </svg>
  );
}
