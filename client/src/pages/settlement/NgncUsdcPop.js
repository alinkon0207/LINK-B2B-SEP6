import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeft } from 'react-icons/bs';
import { useState } from 'react';
import { SlCloudUpload } from 'react-icons/sl';
import ReactFileReader from 'react-file-reader';
import { toast } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { useNgncusdcMutation } from '../../services/settlementApi';
import {
  selectCurrentUID,
  selectCurrentEmail,
  selectCurrentUser,
} from '../../features/auth/authSlice';
import { setNextTab } from '../../features/settlementTabSlice';
import { selectSettlementData } from '../../features/settlementSlice';

export default function NgncUsdcPop() {
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const settlementData = useSelector(selectSettlementData);
  const userId = useSelector(selectCurrentUID);
  const email = useSelector(selectCurrentEmail);
  const fullName = useSelector(selectCurrentUser);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFiles = (files) => {
    setProofOfPayment(files.base64);
  };
  const [ngncUsdc] = useNgncusdcMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!proofOfPayment) return toast.error('Please upload a proof of payment');

    try {
      const response = await ngncUsdc({
        ...settlementData,
        userId,
        email,
        fullName,
        proofOfPayment,
      });
      if (response.data.status === 200) {
        toast.success(response.data.message);
        dispatch(setNextTab({ tab: 'ngnc-success' }));
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div
          onClick={() => dispatch(setNextTab({ tab: 'ngnc-otc' }))}
          className="flex items-center space-x-3 text-primary text-xl font-medium -mt-8 cursor-pointer"
        >
          <BsArrowLeft className="text-2xl" />{' '}
          <span className="hidden md:block">Go back</span>
        </div>
        <h1 className="text-black text-xl md:text-4xl font-semibold -mt-8 -ml-16">
          Proof of Payment
        </h1>
        <div></div>
      </div>
      <div className="py-5">
        <p className="text-gray-500 text-lg font-medium mt-10">
          Upload a screenshot of your payment
        </p>
        <div className="mt-3 border border-gray-500 border-dashed flex flex-col md:flex-row items-center justify-between space-x-5 px-2 md:px-8 py-6 rounded-lg">
          <div className="flex items-center space-x-5">
            <SlCloudUpload className="text-4xl text-primary" />
            <div>
              <h3 className="text-black text-lg">Upload files here</h3>
              <p className="text-gray-500">Max. file size: 2MB</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0">
            <ReactFileReader
              fileTypes={['.png', '.jpg']}
              base64={true}
              handleFiles={handleFiles}
            >
              <label
                className={` ${
                  proofOfPayment
                    ? 'bg-primary text-white'
                    : 'bg-white text-black'
                } hover:bg-opacity-80 rounded-md py-2 text-lg px-8 shadow text-center cursor-pointer`}
              >
                {proofOfPayment ? 'Uploaded' : 'Browse files'}
              </label>
            </ReactFileReader>
          </div>
        </div>
        <div className="mt-10 flex justify-center items-center">
          <button
            className="bg-secondary flex items-center justify-center space-x-5 px-14 py-3 font-circular capitalize w-full md:w-96 text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-blue-400 transition duration-200 ease-out cursor-pointer outline-none"
            onClick={handleSubmit}
          >
            <span>Continue</span>
            {isLoading && <ImSpinner2 className="text-white animate-spin " />}
          </button>
        </div>
      </div>
    </>
  );
}
