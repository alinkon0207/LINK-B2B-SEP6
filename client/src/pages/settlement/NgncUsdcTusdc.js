import { setNextTab } from "../../features/settlementTabSlice";
import { useDispatch } from "react-redux";
import Coins from "../../assets/coins.png";

export default function NgncUsdcCircle() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center justify-between"></div>
      <div className="py-32">
        <div className="flex flex-col items-center justify-center text-2xl md:text-3xl font-medium leading-10 text-gray-900 font-circular">
          <div className="flex items-center md:space-x-5 justify-center space-x-3">
            <h1 className="text-2xl md:text-4xl font-semibold">
              All settlements happen in{" "}
            </h1>
            <img
              src={Coins}
              className="w-14 h-14 md:w-32 md:h-32 object-contain"
              alt="tether usdc"
            />
          </div>

          <button
            className="flex bg-secondary px-20 py-2 font-circular mt-5 capitalize items-center justify-center space-x-2 w-auto text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-blue-400 transition duration-200 ease-out cursor-pointer outline-none"
            onClick={() => dispatch(setNextTab({ tab: "ngnc-otc" }))}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
