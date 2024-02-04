/* eslint-disable no-unused-vars */
import { BsArrowLeft, BsChevronRight } from "react-icons/bs";
import { setNextTab } from "../../features/settlementTabSlice";
import { useDispatch } from "react-redux";

const UsdcNgnc = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div
          onClick={() => dispatch(setNextTab({ tab: "main" }))}
          className="cursor-pointer flex items-center space-x-3 text-primary text-xl font-medium -mt-5"
        >
          <BsArrowLeft className="text-2xl" />{" "}
          <span className="hidden md:block">Go back</span>
        </div>
        <div></div>
      </div>
      <div className="pt-10 pb-20 px-2 md:px-5">
        <h1 className="text-black text-2xl md:text-4xl font-semibold mt-2">
          How do you want your settlement?
        </h1>
        <div className="space-y-10 mt-10">
          <div
            onClick={() => dispatch(setNextTab({ tab: "usdc-otc" }))}
            className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary"
          >
            <div className="flex items-center space-x-5">
              <OTC
                className="w-20 h-20 md:w-16 md:h-16 lg:w-12 lg:h-12 mr-2"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <h1 className="text-black text-xl font-medium">OTC Request</h1>
                <p className="text-gray-500 text-base md:text-lg">
                  Request a settlement in a NGNC wallet
                </p>
              </div>
            </div>
            <div>
              <BsChevronRight className="text-gray-400 text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary">
            <div className="flex items-center space-x-5">
              <Marketplace
                className="w-26 h-26 md:w-16 md:h-16 lg:w-12 lg:h-12 mr-2"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <h1 className="text-black text-xl font-medium">
                  Marketplace{" "}
                  <span className=" bg-primary p-1 text-sm text-white rounded">
                    Coming soon
                  </span>
                </h1>
                <p className="text-gray-500 text-sm md:text-lg">
                  Do high OTC vollume NGNC/USDC and other assets with P2P
                  Traders
                </p>
              </div>
            </div>
            <div>
              <BsChevronRight className="text-gray-400 text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsdcNgnc;

function OTC(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39.5" cy="39.5" r="39.5" fill="#DBE7FF" />
      <path
        d="M37.2964 50.53V54.9284C37.2964 58.655 33.8297 61.6667 29.5614 61.6667C25.293 61.6667 21.8047 58.655 21.8047 54.9284V50.53C21.8047 54.2567 25.2714 56.9 29.5614 56.9C33.8297 56.9 37.2964 54.235 37.2964 50.53Z"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.2926 44.5716C37.2926 45.655 36.9893 46.6516 36.4693 47.5183C35.191 49.62 32.5693 50.9416 29.536 50.9416C26.5026 50.9416 23.881 49.5983 22.6026 47.5183C22.0826 46.6516 21.7793 45.655 21.7793 44.5716C21.7793 42.7083 22.646 41.04 24.0326 39.8266C25.441 38.5916 27.3693 37.855 29.5143 37.855C31.6593 37.855 33.5876 38.6133 34.996 39.8266C36.426 41.0183 37.2926 42.7083 37.2926 44.5716Z"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.2964 44.5717V50.53C37.2964 54.2567 33.8297 56.9 29.5614 56.9C25.293 56.9 21.8047 54.235 21.8047 50.53V44.5717C21.8047 40.845 25.2714 37.8334 29.5614 37.8334C31.7064 37.8334 33.6347 38.5917 35.043 39.805C36.4297 41.0183 37.2964 42.7083 37.2964 44.5717ZM61.667 37.7684V42.2317C61.667 43.4233 60.7137 44.3984 59.5004 44.4417H55.2537C52.9137 44.4417 50.7687 42.73 50.5737 40.39C50.4437 39.025 50.9637 37.7467 51.8737 36.8584C52.6754 36.035 53.7804 35.5583 54.9937 35.5583H59.5004C60.7137 35.6017 61.667 36.5767 61.667 37.7684Z"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.334 36.7499V32.4166C18.334 26.5233 21.8873 22.4066 27.4123 21.7133C27.9757 21.6266 28.5607 21.5833 29.1673 21.5833H48.6673C49.2307 21.5833 49.7723 21.6049 50.2923 21.6916C55.8823 22.3416 59.5007 26.4799 59.5007 32.4166V35.5583H54.994C53.7807 35.5583 52.6757 36.0349 51.874 36.8583C50.964 37.7466 50.444 39.0249 50.574 40.3899C50.769 42.7299 52.914 44.4416 55.254 44.4416H59.5007V47.5833C59.5007 54.0832 55.1673 58.4166 48.6673 58.4166H43.2507"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Marketplace(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39.5" cy="39.5" r="39.5" fill="#DBE7FF" />
      <path
        d="M19.5215 37.3101V47.0384C19.5215 56.7667 23.4215 60.6667 33.1498 60.6667H44.8281C54.5565 60.6667 58.4565 56.7667 58.4565 47.0384V37.3101"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.9997 38.9999C42.9647 38.9999 45.8897 35.7716 45.4997 31.8066L44.0697 17.3333H33.9514L32.4997 31.8066C32.1097 35.7716 35.0347 38.9999 38.9997 38.9999Z"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.6721 38.9999C57.0488 38.9999 60.2555 35.4466 59.8221 31.0916L59.2155 25.1333C58.4355 19.4999 56.2688 17.3333 50.5921 17.3333H43.9838L45.5005 32.5216C45.8688 36.0966 49.0971 38.9999 52.6721 38.9999ZM25.2205 38.9999C28.7955 38.9999 32.0238 36.0966 32.3705 32.5216L32.8471 27.7333L33.8871 17.3333H27.2788C21.6021 17.3333 19.4355 19.4999 18.6555 25.1333L18.0705 31.0916C17.6371 35.4466 20.8438 38.9999 25.2205 38.9999ZM39.0005 49.8332C35.3821 49.8332 33.5838 51.6316 33.5838 55.2499V60.6666H44.4171V55.2499C44.4171 51.6316 42.6188 49.8332 39.0005 49.8332Z"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
