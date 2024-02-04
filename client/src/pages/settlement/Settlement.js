/* eslint-disable no-unused-vars */
import { BsChevronRight } from "react-icons/bs";
import {
  useGetUsdcNgncRatesQuery,
  useGetNgncUsdcRatesQuery,
} from "../../services/rateApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNgncRates, setUsdcRates } from "../../features/rateSlice";
import { setNextTab } from "../../features/settlementTabSlice";

const Settlement = () => {
  const dispatch = useDispatch();

  const { data: usdcNgncdata, isFetchingUsdc } = useGetUsdcNgncRatesQuery({
    refetchOnMountOrArgChange: false,
  });

  const { data: ngncUsdcdata, isFetchingNgnc } = useGetNgncUsdcRatesQuery({
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    if (!isFetchingUsdc) {
      dispatch(setUsdcRates({ usdcRates: usdcNgncdata }));
    }
  }, [isFetchingUsdc, usdcNgncdata]);

  useEffect(() => {
    if (!isFetchingNgnc) {
      dispatch(setNgncRates({ ngncRates: ngncUsdcdata }));
    }
  }, [isFetchingNgnc, ngncUsdcdata]);

  return (
    <div className="pt-8 pb-20 px-2 md:px-5">
      <h1 className="text-black text-2xl md:text-4xl font-semibold mt-2">
        What settlement do you want to do?
      </h1>
      <div className="space-y-10 mt-10">
        <div
          onClick={() => dispatch(setNextTab({ tab: "ngnc-usdc" }))}
          className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary"
        >
          <div className="flex items-center space-x-5">
            <NgncUsdc className="w-20 h-20 md:w-16 md:h-16 lg:w-12 lg:h-12 mr-2" />
            <div className="space-y-1">
              <h1 className="text-black text-xl font-medium">
                NGNC to USDC/USDT/BUSD
              </h1>
              <p className="text-gray-500 text-base md:text-lg">
                Send your NGNC and get a settlement in USDC/USDT/BUSD
              </p>
            </div>
          </div>
          <div>
            <BsChevronRight className="text-gray-400 text-2xl" />
          </div>
        </div>
        <div
          onClick={() => dispatch(setNextTab({ tab: "usdc-ngnc" }))}
          className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary"
        >
          <div className="flex items-center space-x-5">
            <UsdcNgnc className="w-20 h-20 md:w-16 md:h-16 lg:w-12 lg:h-12 mr-2" />
            <div className="space-y-1">
              <h1 className="text-black text-xl font-medium">
                USDC/USDT/BUSD to NGNC
              </h1>
              <p className="text-gray-500 text-base md:text-lg">
                Send your USDC/USDT/BUSD and get a settlement in NGNC
              </p>
            </div>
          </div>
          <div>
            <BsChevronRight className="text-gray-400 text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settlement;

function UsdcNgnc(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39.5" cy="39.5" r="39.5" fill="#DBE7FF" />
      <g clipPath="url(#clip0_1792_19871)">
        <path
          d="M62.8327 47.6016C62.8327 55.9866 56.051 62.7682 47.666 62.7682L49.941 58.9766M15.166 30.2682C15.166 21.8832 21.9477 15.1016 30.3327 15.1016L28.0577 18.8932"
          stroke="#1565D8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45.1742 46.215C45.1742 53.6033 39.1942 59.5833 31.8058 59.5833C24.4175 59.5833 18.4375 53.6033 18.4375 46.215C18.4375 38.8267 24.4175 32.8467 31.8058 32.8467C32.1525 32.8467 32.4775 32.8683 32.8458 32.89C39.4108 33.3883 44.6542 38.6317 45.1525 45.1967C45.1525 45.5217 45.1742 45.8467 45.1742 46.215Z"
          stroke="#1565D8"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M59.5824 31.7851C59.5824 39.1734 53.6024 45.1534 46.214 45.1534H45.1524C44.9065 41.9713 43.5309 38.9819 41.2741 36.725C39.0173 34.4682 36.0279 33.0926 32.8457 32.8467V31.7851C32.8457 24.3967 38.8257 18.4167 46.214 18.4167C53.6024 18.4167 59.5824 24.3967 59.5824 31.7851Z"
          stroke="#1565D8"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42 37V27.9258C42 27.6349 42.3724 27.5143 42.543 27.7498L44.4138 30.3333M49.2414 27V36.0742C49.2414 36.3651 48.869 36.4857 48.6984 36.2502L44.4138 30.3333M44.4138 30.3333H52M46.9546 33.8421H52"
          stroke="#1565D8"
          strokeWidth="1.5"
        />
        <path
          d="M29 48.2857C29 49.5714 29.875 50.5714 31 50.5714H33.125C34 50.5714 34.875 49.7143 34.875 48.5714C34.875 47.2857 34.375 46.8571 33.75 46.5714L30.25 45.1429C29.375 45 29 44.5714 29 43.4286C29 42.2857 29.75 41.4286 30.75 41.4286H33C34.125 41.4286 35 42.4286 35 43.7143M31.875 40V52"
          stroke="#1565D8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1792_19871">
          <rect
            width="52"
            height="52"
            fill="white"
            transform="translate(13 13)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
function NgncUsdc(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39.5" cy="39.5" r="39.5" fill="#DBE7FF" />
      <g clipPath="url(#clip0_1792_19938)">
        <path
          d="M62.8327 47.6016C62.8327 55.9866 56.051 62.7682 47.666 62.7682L49.941 58.9766M15.166 30.2682C15.166 21.8832 21.9477 15.1016 30.3327 15.1016L28.0577 18.8932"
          stroke="#1565D8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45.1742 46.215C45.1742 53.6033 39.1942 59.5833 31.8058 59.5833C24.4175 59.5833 18.4375 53.6033 18.4375 46.215C18.4375 38.8267 24.4175 32.8467 31.8058 32.8467C32.1525 32.8467 32.4775 32.8683 32.8458 32.89C39.4108 33.3883 44.6542 38.6317 45.1525 45.1967C45.1525 45.5217 45.1742 45.8467 45.1742 46.215Z"
          stroke="#1565D8"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M59.5824 31.7851C59.5824 39.1734 53.6024 45.1534 46.214 45.1534H45.1524C44.9065 41.9713 43.5309 38.9819 41.2741 36.725C39.0173 34.4682 36.0279 33.0926 32.8457 32.8467V31.7851C32.8457 24.3967 38.8257 18.4167 46.214 18.4167C53.6024 18.4167 59.5824 24.3967 59.5824 31.7851Z"
          stroke="#1565D8"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 52V40.9258C26 40.6349 26.3724 40.5143 26.543 40.7498L28.8966 44M34.6897 40V51.0742C34.6897 51.3651 34.3173 51.4857 34.1467 51.2502L28.8966 44M28.8966 44H38M31.9456 48.2105H38"
          stroke="#1565D8"
          strokeWidth="2"
        />
        <path
          d="M43 34.2857C43 35.5714 43.875 36.5714 45 36.5714H47.125C48 36.5714 48.875 35.7143 48.875 34.5714C48.875 33.2857 48.375 32.8571 47.75 32.5714L44.25 31.1429C43.375 31 43 30.5714 43 29.4286C43 28.2857 43.75 27.4286 44.75 27.4286H47C48.125 27.4286 49 28.4286 49 29.7143M45.875 26V38"
          stroke="#1565D8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1792_19938">
          <rect
            width="52"
            height="52"
            fill="white"
            transform="translate(13 13)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
