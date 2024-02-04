import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import Copy from "../../assets/images/svg/copy.svg";
import QRCode from "react-qr-code";
import { toast } from "react-hot-toast";
import { selectNgncRates } from "../../features/rateSlice";
import { useSelector, useDispatch } from "react-redux";
import { setNextTab } from "../../features/settlementTabSlice";
import { setSettlement } from "../../features/settlementSlice";

const ngncNetworks = [
  {
    name: "Solana",
    value: "solana",
    address: "zvPykyYwNacobB7mS7KwR7CnkHQWnKVTpJXQ6QNHVSp",
  },
  {
    name: "Stellar",
    value: "stella",
    address: "GAQKDKLJUIDWJUB3PMINBCOH6TJWELQML7LLYY7OJ3Z6XXMGJQ53L6V5",
  },
  {
    name: "Polygon",
    value: "polygon",
    address: "0xbf77a6649dd0d17f2a4b57cda3401af47646bf4a",
  },
];

export default function NgncUsdcOtc() {
  const [address, setAddress] = useState(
    "zvPykyYwNacobB7mS7KwR7CnkHQWnKVTpJXQ6QNHVSp"
  );
  const [ngncNetwork, setNgncNetwork] = useState("solana");
  const [token, setToken] = useState("");
  const [tokenNetwork, setTokenNetwork] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const rates = useSelector(selectNgncRates);
  const dispatch = useDispatch();

  useEffect(() => {
    ngncNetworks.filter((network) => {
      return network.value === ngncNetwork && setAddress(network.address);
    });
  }, [ngncNetwork]);

  const handleSubmit = () => {
    if (!walletAddress || !ngncNetwork || !tokenNetwork || !token)
      return toast.error("Please fill all fields");
    dispatch(
      setSettlement({
        ngncNetwork,
        token,
        tokenNetwork,
        walletAddress,
        linkAddress: address,
      })
    );
    dispatch(setNextTab({ tab: "ngnc-pop" }));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div
          onClick={() => dispatch(setNextTab({ tab: "ngnc-tusdc" }))}
          className="flex items-center space-x-3 text-primary text-xl font-medium -mt-8 cursor-pointer"
        >
          <BsArrowLeft className="text-2xl" />{" "}
          <span className="hidden md:block">Go back</span>
        </div>
        <h1 className="text-black text-xl md:text-4xl font-semibold -mt-8 -ml-16">
          OTC Request
        </h1>
        <div></div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-10 my-10">
        <div className="space-y-4">
          <div className="bg-primary text-primary bg-opacity-20 p-4 rounded-md">
            1 USD = {rates?.USD} NGN
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <p className="text-gray-500 text-lg">Select NGNC network</p>
              <select
                name="network"
                id="network"
                value={ngncNetwork}
                onChange={(e) => setNgncNetwork(e.target.value)}
                className="w-full bg-white text-lg text-gray-500 p-4 rounded-md placeholder-gray-500 outline-none"
              >
                {ngncNetworks.map((network, index) => (
                  <option value={network.value} key={index}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-gray-500 text-lg">Select Token for Payout</p>
              <select
                name="wallet_network"
                id="wallet_network"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-white text-lg text-gray-500 p-4 rounded-md placeholder-gray-500 outline-none"
              >
                <option value="select"> Select Token</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="BUSD">BUSD</option>
              </select>
            </div>
            <div>
              <p className="text-gray-500 text-lg">
                Select Token wallet network
              </p>
              <select
                name="wallet_network"
                id="wallet_network"
                value={tokenNetwork}
                onChange={(e) => setTokenNetwork(e.target.value)}
                className="w-full bg-white text-lg text-gray-500 p-4 rounded-md placeholder-gray-500 outline-none"
              >
                <option value="select"> Select Network</option>
                <option value="avalanche">Avalanche</option>
                <option value="solana">Solana</option>
                <option value="stellar">Stellar</option>
                <option value="polygon">Polygon</option>
              </select>
            </div>
            <div>
              <p className="text-gray-500 text-lg">
                Enter a wallet address to receive token
              </p>
              <input
                type="text"
                name="wallet_address"
                id="wallet_address"
                value={walletAddress}
                placeholder="Enter a wallet address"
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full bg-white text-lg text-gray-500 p-3 rounded-md placeholder-gray-500 outline-none"
              />
            </div>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-lg py-10 md:py-5 px-7 space-y-7">
            <h3 className="text-xl text-center text-black">
              Send the exact NGNC to the wallet address below.
            </h3>
            <div
              className="flex items-center justify-center my-4 rounded-md p-2 space-x-5"
              style={{ border: "1px solid #1565D8" }}
            >
              <textarea
                className="resize-none w-full bg-white text-base text-black p-1 rounded-md placeholder-gray-500 outline-none"
                disabled
                cols="3"
                rows="2"
                value={address}
              ></textarea>
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  toast.success("Address copied");
                }}
              >
                <img className="block h-10 w-10" src={Copy} alt="" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <QRCode value={address} className="block w-32 h-32" />
            </div>
          </div>
          <button
            className="flex bg-secondary px-16 py-3 font-circular capitalize items-center justify-center space-x-2 w-full my-10 text-white font-normal text-base mb-4 mr-6 rounded-md  active:ring ring-blue-400 transition duration-200 ease-out cursor-pointer outline-none"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </section>
    </>
  );
}
