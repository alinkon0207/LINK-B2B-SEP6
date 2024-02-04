import { Link } from "react-router-dom";
import { CheckSuccess } from "../../assets/Images";

export const NgncUsdcSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-10">
      <h1 className="text-slate-800 text-3xl md:text-5xl font-bold text-center">
        Request received
      </h1>
      <CheckSuccess width={200} height={200} />
      <p className="text-black text-base w-96 mx-auto text-center">
        Once we receive your NGNC your USDC wallet will be funded
      </p>
      <div className="pb-10">
        <Link to="/user/dashboard">
          <button className="bg-secondary rounded-md text-white text-lg py-3 px-8 w-72">
            Done
          </button>
        </Link>
      </div>
    </div>
  );
};
