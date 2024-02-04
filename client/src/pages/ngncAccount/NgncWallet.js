/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import { BsArrowLeft, BsChevronRight } from "react-icons/bs";
import Copy from "../../assets/images/svg/copy.svg";
import Withdraw from "../../assets/images/svg/withdraw.svg";
import Transfer from "../../assets/images/svg/transfer.svg";
import Streamable from "../../assets/streamable.svg";
import Polygon from "../../assets/ngnc/polygon.svg";
import Solana from "../../assets/ngnc/solana.svg";
import Stellar from "../../assets/ngnc/stellar.svg";
import { Navbar } from "../../components";
import { useState } from "react";
import WithdrawDefiPopup from "../../components/modal/WithdrawDefiPopup";
import TransferNgncPopup from "../../components/modal/TransferNgncPopup";
import { ZebecPopup } from "../../components/modal/ZebecPopup";
import { toast } from "react-hot-toast";

const networkImages = [
  {
    name: "SOLANA",
    image: Solana,
  },
  {
    name: "STELLAR",
    image: Stellar,
  },
  {
    name: "POLYGON",
    image: Polygon,
  },
];

const addressesLinks = [
  {
    name: "SOLANA",
    add: "BnqWRLZz3sHhH3xxwv6nXKRr6AcotfMay7uDjD58J1Q3",
  },
  {
    name: "STELLAR",
    add: "GAQKDKLJUIDWJUB3PMINBCOH6TJWELQML7LLYY7OJ3Z6XXMGJQ53L6V5",
  },
  {
    name: "POLYGON",
    add: "0x2186030a127D970fa7B17E53F3fD8550D17394A5",
  },
];

const NgncWallet = () => {
  const location = useLocation();
  const [openDefiModal, setOpenDefiModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [openZebecModal, setOpenZebecModal] = useState(false);

  const { balance, image, asset_chain, asset_type, asset_address } =
    location.state;

  const filterImage = networkImages.filter((item) => item.name === asset_chain);

  const filterAddress = addressesLinks.filter(
    (item) => item.name === asset_chain
  );

  const handleOpenDefiModal = () => {
    setOpenDefiModal(true);
  };

  const handleCloseDefiModal = () => {
    setOpenDefiModal(false);
  };

  const handleOpenTransferModal = () => {
    setOpenTransferModal(true);
  };

  const handleCloseTransferModal = () => {
    setOpenTransferModal(false);
  };

  const handleOpenZebecModal = () => {
    setOpenZebecModal(true);
  };

  const handleCloseZebecModal = () => {
    setOpenZebecModal(false);
  };

  return (
    <>
      <div className="mb-24 md:mb-32">
        <Navbar />
      </div>

      <main className="w-[90%] lg:w-[80%] mx-auto my-10 ">
        <Link
          to={-1}
          className="flex items-center space-x-3 text-primary text-xl font-medium mb-5 back rounds"
        >
          <BsArrowLeft className="text-xl font-bold" />
          <span className="block">Go back</span>
        </Link>

        <div className="rounds2">
          <div className="flex items-center details space-x-6">
            <h1 className="text-black text-2xl lg:text-3xl font-semibold">
              Your <span>{asset_chain}</span> NGNC wallet
            </h1>
            <img
              className="block "
              style={{
                height: "5rem",
                width: "auto",
              }}
              src={filterImage[0].image}
              alt={asset_chain}
            />
          </div>
          <section>
            <div className="flex items-center justify-between rate">
              <div className="space-y-1">
                <h1 className="text-black text-2xl lg:text-5xl font-medium">
                  {balance}
                </h1>
                <p className="text-gray-500 text-lg">NGNC</p>
              </div>
            </div>

            <div className="block bg-white rounded-lg py-3 px-5 text-black font-semibold md:flex justify-between items-center mt-10">
              <p className="text-gray-500 text-base md:text-xl font-normal">
                Wallet address
              </p>
              <p className="text-xs md:text-base lg:text-xl">{asset_address}</p>
              <div
                className="cursor-pointer"
                onClick={() => {
                  window.navigator.clipboard.writeText(asset_address);
                  toast.success("Copied to clipboard");
                }}
              >
                <img className="block " src={Copy} alt={image} />
              </div>
            </div>

            <div className="mt-5">
              <div
                className={`flex ${
                  asset_chain === "SOLANA" ? "justify-between" : "justify-start"
                } items-center flex-wrap gap-5`}
              >
                <>
                  <div
                    className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary"
                    onClick={handleOpenDefiModal}
                  >
                    <div className="flex items-center space-x-5">
                      <div>
                        <img src={Withdraw} alt={image} className="w-16 h-16" />
                      </div>
                      <div className="space-y-1">
                        <h1 className="text-black text-xl font-medium">
                          Withdraw to a DeFi wallet
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg">
                          Withdraw to a{" "}
                          <span className="lowercase">{asset_chain}</span>{" "}
                          wallet
                        </p>
                      </div>
                    </div>
                    <div>
                      <BsChevronRight className="text-gray-400 text-2xl" />
                    </div>
                  </div>
                  <WithdrawDefiPopup
                    isOpen={openDefiModal}
                    closeModal={handleCloseDefiModal}
                    network={asset_chain}
                    asset={asset_type}
                    address={asset_address}
                    balance={balance}
                  />
                </>
                <>
                  <div
                    className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary"
                    onClick={handleOpenTransferModal}
                  >
                    <div className="flex items-center space-x-5">
                      <div>
                        <img src={Transfer} alt={image} className="w-16 h-16" />
                      </div>
                      <div className="space-y-1">
                        <h1 className="text-black text-xl font-medium">
                          Transfer
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg">
                          Transfer to your NGN wallet
                        </p>
                      </div>
                    </div>
                    <div>
                      <BsChevronRight className="text-gray-400 text-2xl" />
                    </div>
                  </div>
                  <TransferNgncPopup
                    isOpen={openTransferModal}
                    closeModal={handleCloseTransferModal}
                    network={asset_chain}
                    asset={asset_type}
                    address={asset_address}
                    balance={balance}
                    link_address={filterAddress[0].add}
                  />
                </>
                {asset_chain === "SOLANA" && (
                  <>
                    <div
                      className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary"
                      // onClick={handleOpenZebecModal}
                    >
                      <div className="flex items-center space-x-5">
                        <div>
                          <img
                            src={Streamable}
                            alt={image}
                            className="w-16 h-16"
                          />
                        </div>
                        <div className="space-y-1">
                          <h1 className="text-black text-xl font-medium">
                            Streamable NGNC{" "}
                            <span className="bg-primary p-1 text-sm text-white rounded">
                              Coming soon
                            </span>
                          </h1>
                          <p className="text-gray-500 text-base md:text-lg">
                            Stream NGN payment with Zebec’s API
                          </p>
                        </div>
                      </div>
                      <div>
                        <BsChevronRight className="text-gray-400 text-2xl" />
                      </div>
                    </div>
                    <ZebecPopup
                      isOpen={openZebecModal}
                      closeModal={handleCloseZebecModal}
                    />
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default NgncWallet;
