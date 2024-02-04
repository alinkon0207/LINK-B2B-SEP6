import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { Fragment } from "react";
import { CgClose } from "react-icons/cg";
import { BsArrowLeft } from "react-icons/bs";
import Zebec from "../../assets/images/svg/zebec.svg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { step_1 } from "../../features/zebecSlice";
import NGNC from "../../assets/images/svg/NGNC-logo.svg";
import Clock from "../../assets/images/svg/clock.svg";
import Calendar from "../../assets/images/svg/calendar.svg";

export const ZebecPopup = ({ isOpen, closeModal }) => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < 2) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  const content = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="py-32">
            <div className="flex flex-col items-center justify-center text-2xl md:text-3xl font-medium leading-10 text-gray-900 font-circular">
              <div className="flex">
                <span>We've partnered with</span>
                <img src={Zebec} alt="zebec" className="w-14 h-14 pb-5" />
                <span>Zebec</span>
              </div>
              <h3 className="-mt-4">to provide streamable payments</h3>
            </div>
            <h3 className="block lg:hidden text-2xl md:text-3xl font-medium leading-10 text-gray-900 text-center font-circular">
              Please login on your desktop to use this feature
            </h3>
          </div>
        );
      case 1:
        return <ZebecStepper1 />;
      case 2:
        return <ZebecStepper2 />;
      default:
        break;
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-xl bg-[#F3F4F6] py-6 px-8 text-left align-middle shadow transition-all">
                  <div className="flex justify-between items-center">
                    <div
                      className="flex items-center justify-end mt-3 mb-10 font-circular"
                      onClick={prevStep}
                    >
                      <BsArrowLeft className="text-3xl text-primary hover:bg-primary hover:bg-opacity-5 p-1 rounded-md cursor-pointer transition-all ease-linear" />
                    </div>
                    <div
                      className="flex items-center justify-end mt-3 mb-10 font-circular"
                      onClick={closeModal}
                    >
                      <CgClose className="text-3xl text-primary hover:bg-primary hover:bg-opacity-5 p-1 rounded-md cursor-pointer transition-all ease-linear" />
                    </div>
                  </div>

                  <div>
                    {content()}
                    <div className="mt-8 mb-1 flex justify-center">
                      <button
                        className="hidden lg:flex bg-secondary px-16 py-2 font-circular capitalize items-center justify-center space-x-2 w-full md:w-auto text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-blue-400 transition duration-200 ease-out cursor-pointer outline-none"
                        onClick={nextStep}
                      >
                        {activeStep === 0
                          ? "Continue"
                          : activeStep === 1
                          ? "Next"
                          : "Send"}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const initialState = {
  transaction_name: "",
  remark: "",
  wallet_address: "",
  amount: "",
  start_date: "",
  start_time: "",
  completion_time: "",
  completion_date: "",
  stream_rate: {},
};

export const ZebecStepper1 = () => {
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = () => {
    dispatch(step_1({ ...data }));
  };

  return (
    <div className=" py-3">
      <h1 className="text-black text-xl font-circular font-semibold mb-8 -mt-10">
        Send continuous transfer <span className="text-primary">(1/2)</span>
      </h1>

      <form
        className="font-circular space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center space-x-5">
          <div className="space-y-2 w-full">
            <p className="text-gray-500 text-base">
              <span className="capitalize">Transaction name</span>
            </p>
            <input
              {...register("transaction_name", { required: true })}
              className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
              type="text"
              placeholder="Eg. John’s salary"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2 w-full">
            <p className="text-gray-500 text-base">
              <span className="capitalize">Remark</span>
            </p>
            <input
              {...register("remark", { required: true })}
              className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
              type="text"
              placeholder="Write here..."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-500 text-base">
            <span className="capitalize">Receiver wallet address</span>
          </p>
          <input
            {...register("wallet_address", { required: true })}
            className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
            type="text"
            placeholder="Enter wallet address"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center space-x-5">
          <div className="space-y-2 w-52">
            <p className="text-gray-500 text-base">
              <span className="capitalize">Token</span>
            </p>
            <div className="w-full bg-white rounded-md flex  p-3  items-center text-gray-500 font-normal text-lg space-x-3">
              <img className="w-9" src={NGNC} alt="LINK Logo" />
              <p>Token</p>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-gray-500 text-base">
              <span className="capitalize">Amount</span>
            </p>

            <div className="bg-white text-lg text-gray-900 font-medium pr-5 rounded-md flex justify-between items-center w-full space-x-4">
              <input
                {...register("amount", { required: true })}
                className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                type="text"
                placeholder="Enter amount"
                onChange={handleChange}
              />
              <p className="text-gray-500">Max</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export const ZebecStepper2 = () => {
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = () => {
    dispatch(step_1({ ...data }));
  };

  return (
    <>
      <h1 className="text-black text-xl font-circular font-semibold mb-8 -mt-10">
        Send continuous transfer <span className="text-primary">(2/2)</span>
      </h1>

      <form
        className="font-circular space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center space-x-5">
          <div className="space-y-2 w-full">
            <p className="text-gray-500 text-base">
              <span className="capitalize">Start date</span>
            </p>

            <div className="bg-white text-lg text-gray-900 font-medium pr-5 rounded-md flex justify-between items-center w-full space-x-4">
              <input
                {...register("start_date", { required: true })}
                className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none inputpicker"
                type="date"
                onChange={handleChange}
              />
              <p className="text-gray-500">
                <img src={Calendar} alt={Calendar} />
              </p>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-gray-500 text-base">
              <span className="capitalize">Start time</span>
            </p>

            <div className="bg-white text-lg text-gray-900 font-medium pr-5 rounded-md flex justify-between items-center w-full space-x-4">
              <input
                {...register("start_time", { required: true })}
                className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none inputpicker"
                type="time"
                id="clock"
                onChange={handleChange}
              />

              <label htmlFor="clock" className="text-gray-500">
                <img src={Clock} alt={Clock} />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center space-x-5">
          <div className="space-y-2 w-full">
            <p className="text-gray-500 text-base">
              <span className="capitalize">Completion date</span>
            </p>

            <div className="bg-white text-lg text-gray-900 font-medium pr-5 rounded-md flex justify-between items-center w-full space-x-4">
              <input
                {...register("completion_date", { required: true })}
                className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none inputpicker"
                type="date"
                onChange={handleChange}
              />
              <p className="text-gray-500">
                <img src={Calendar} alt={Calendar} />
              </p>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-gray-500 text-base">
              <span className="capitalize">Completion time</span>
            </p>

            <div className="bg-white text-lg text-gray-900 font-medium pr-5 rounded-md flex justify-between items-center w-full space-x-4">
              <input
                {...register("completion_time", { required: true })}
                className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none inputpicker"
                type="time"
                onChange={handleChange}
              />

              <p className="text-gray-500">
                <img src={Clock} alt={Clock} />
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-base mb-3">
            <span className="capitalize">
              Stream rate (Eg. 12 NGNC per 4 weeks)
            </span>
          </p>
          <div className="flex justify-between items-center space-x-5">
            <div className="space-y-2 w-full">
              <input
                {...register("wallet_address", { required: true })}
                className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                type="text"
                placeholder="Eg. 12"
                onChange={handleChange}
              />
              <p className="text-gray-400 text-sm">
                <span className="capitalize">Token amount</span>
              </p>
            </div>
            <div className="space-y-2 w-full">
              <input
                {...register("wallet_address", { required: true })}
                className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                type="text"
                placeholder="Eg. 4"
                onChange={handleChange}
              />
              <p className="text-gray-400 text-sm">
                <span className="capitalize">Number of times</span>
              </p>
            </div>
            <div className="space-y-2 w-full">
              <input
                {...register("wallet_address", { required: true })}
                className="w-full p-3 bg-white text-lg text-gray-500 rounded-md placeholder-gray-400 outline-none"
                type="text"
                placeholder="Eg. weeks"
                onChange={handleChange}
              />
              <p className="text-gray-400 text-sm">
                <span className="capitalize">Time interval</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
