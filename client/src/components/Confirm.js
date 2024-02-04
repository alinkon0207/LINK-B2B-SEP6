import { Link } from "react-router-dom";
import { CheckSuccess } from "../assets/Images";

export const Confirm = () => {
  // const location = useLocation();
  // const { request } = location.state;

  return (
    <div className="flex flex-col items-center justify-center space-y-16 mt-20">
      <h1 className="text-slate-800 text-4xl md:text-5xl font-bold text-center">
        Request received
      </h1>
      <CheckSuccess width={250} height={250} />

      <div>
        <Link to="/user/dashboard">
          <button className="bg-secondary rounded-md text-white text-lg py-3 px-8 w-52">
            Done
          </button>
        </Link>
      </div>
    </div>
  );
};
