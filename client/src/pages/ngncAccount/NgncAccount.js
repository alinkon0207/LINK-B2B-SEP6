/* eslint-disable no-unused-vars */
import { Tab, Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NGNC from "../../assets/images/svg/NGNC-logo.svg";
import SettlementIcon from "../../assets/icons/settlement.svg";
import { BsArrowLeft } from "react-icons/bs";
import { Navbar } from "../../components";
import { NGNCNetwork } from "../../components/balance/Balance";
import { NgncUsdcSuccess } from "../settlement/NgncUsdcSuccess";
import { UsdcNgncSuccess } from "../settlement/UsdcNgncSuccess";
import NgncUsdcCircle from "../settlement/NgncUsdcTusdc";
import UsdcNgncOtc from "../settlement/UsdcNgncOtc";
import NgncUsdcPop from "../settlement/NgncUsdcPop";
import NgncUsdcOtc from "../settlement/NgncUsdcOtc";
import UsdcNgnc from "../settlement/UsdcNgnc";
import NgncUsdc from "../settlement/NgncUsdc";
import TabSet, { TabPanel } from "react-tab-set";
import Settlement from "../settlement/Settlement";
import { selectSettlementTab, close } from "../../features/settlementTabSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";

const NgncAccount = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { ngncAccountData, balance } = location.state;
  const [openSettlementiModal, setOpenSettlementiModal] = useState(false);

  const handleOpenSettlementiModal = () => {
    setOpenSettlementiModal(true);
  };

  const handleCloseSettlementiModal = () => {
    dispatch(close({ tab: "main" }));
    setOpenSettlementiModal(false);
  };

  return (
    <>
      <div className="mb-24 md:mb-32">
        <Navbar />
      </div>

      <main className="w-[90%] lg:w-[80%] mx-auto my-10">
        <Link
          to="/user/dashboard"
          className="flex items-center space-x-3 text-primary text-xl font-medium mb-5 back rounds"
        >
          <BsArrowLeft className="text-xl font-bold" />
          <span className="block">Go back to dashboard</span>
        </Link>

        <div className="rounds2">
          <div className="flex items-center details space-x-6">
            <h1 className="text-black text-2xl lg:text-3xl font-semibold">
              Your NGNC wallets
            </h1>
            <img
              className="block "
              style={{
                height: "5rem",
                width: "auto",
              }}
              src={NGNC}
              alt="flag"
            />
          </div>
          <section className="">
            <div className="block space-y-5 md:space-y-0 md:flex items-center justify-between">
              <div className="flex items-center justify-between rate">
                <div className="space-y-1">
                  <h1 className="text-black text-2xl md:text-5xl font-medium">
                    {balance}
                  </h1>
                  <p className="text-gray-500 text-lg">Available NGNC</p>
                </div>
              </div>
              <button
                className={
                  "cursor-pointer bg-primary justify-center flex items-center text-white px-10 py-3 rounded-lg text-lg space-x-4"
                }
                onClick={handleOpenSettlementiModal}
              >
                <img
                  src={SettlementIcon}
                  alt="settlement"
                  className="w-6 h-6"
                />
                <span>Settlement</span>
              </button>
            </div>

            <SettlementTabs
              isOpen={openSettlementiModal}
              closeModal={handleCloseSettlementiModal}
            />
            <div className="block space-y-5 md:space-y-0 md:flex justify-items-start items-center flex-wrap gap-6 mt-10">
              {ngncAccountData?.map((data, index) => (
                <div key={index}>
                  <Link
                    to={{
                      pathname: `/user/${data.asset_chain}-ngnc-wallet`,
                    }}
                    state={data}
                    className=""
                  >
                    <NGNCNetwork
                      amount={data.balance}
                      title={data.asset_chain}
                      image={data.asset_chain}
                      address={data.asset_address}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default NgncAccount;

export const SettlementTabs = ({ closeModal, isOpen }) => {
  const settlementTab = useSelector(selectSettlementTab);

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
                <Dialog.Panel
                  style={{
                    fontFamily: "Circular Std-Regular, Circular Std-Book",
                  }}
                  className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-[#F3F4F6] py-6 px-8 text-left align-middle shadow transition-all"
                >
                  <div
                    onClick={closeModal}
                    className="flex items-center justify-end space-x-3 text-primary text-lg font-medium cursor-pointer font-circular"
                  >
                    <span>Cancel</span>
                    <CgClose className="text-2xl" />
                  </div>

                  <TabSet selectedTab={settlementTab}>
                    <TabPanel tab="main">
                      <Settlement />
                    </TabPanel>
                    <TabPanel tab="ngnc-usdc">
                      <NgncUsdc />
                    </TabPanel>
                    <TabPanel tab="ngnc-tusdc">
                      <NgncUsdcCircle />
                    </TabPanel>
                    <TabPanel tab="ngnc-otc">
                      <NgncUsdcOtc />
                    </TabPanel>
                    <TabPanel tab="ngnc-pop">
                      <NgncUsdcPop />
                    </TabPanel>
                    <TabPanel tab="ngnc-success">
                      <NgncUsdcSuccess />
                    </TabPanel>
                    <TabPanel tab="usdc-ngnc">
                      <UsdcNgnc />
                    </TabPanel>
                    <TabPanel tab="usdc-otc">
                      <UsdcNgncOtc />
                    </TabPanel>
                    <TabPanel tab="usdc-success">
                      <UsdcNgncSuccess />
                    </TabPanel>
                  </TabSet>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
