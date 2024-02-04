/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Register from "../../assets/register_2.svg";
import Payout from "../../assets/Arrow.svg";
import Transaction from "../../assets/Arrow_2.svg";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Navbar } from "../../components";
import moment from "moment";
import { useAllAccountsQuery } from "../../services/userAuthAPi";
import { useGetWithdrawalQuery } from "../../services/transactionApi";
import { useSelector } from "react-redux";
import { selectCurrentUID } from "../../features/auth/authSlice";

export default function AdminDashboard() {
  const [registeredAccounts, setRegisteredAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const userId = useSelector(selectCurrentUID);
  const { data, isFetching } = useAllAccountsQuery("", {
    refetchOnMountOrArgChange: false,
  });
  const { data: transac, isFetching: fetching } = useGetWithdrawalQuery(
    userId,
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    if (!isFetching) {
      setRegisteredAccounts(data.accounts);
    }
  }, [data, isFetching]);

  useEffect(() => {
    if (!fetching) {
      setTransactions(transac.withdrawals);
    }
  }, [transac, fetching]);

  const [value, setValue] = useState("1");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="mb-24 md:mb-32">
        <Navbar />
      </div>

      <main className="w-[90%] lg:w-[80%] mx-auto">
        <section className="mt-5 mb-5">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl capitalize text-gray-900">
            Hi, Admin
          </h1>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <section className="my-5 space-y-5">
            <article
              className="max-w-sm md:w-80 shadow-lg rounded-lg cursor-pointer bg-white text-black p-5 space-y-4 transition ease-in hover:shadow-md active:shadow-sm"
              onClick={() => navigate("/admin/create-account")}
            >
              <div className="flex items-center justify-between ">
                <div>
                  <h1 className="text-3xl font-medium capitalize">Register</h1>
                </div>
                <div className="h-[45px] w-[45px]">
                  <img src={Register} alt={Register} />
                </div>
              </div>
              <div className="py-2">
                <p className="text-gray-500 text-base">
                  Register businesses with completed and verified KYB.
                </p>
              </div>
            </article>

            <article
              className="max-w-sm md:w-80 shadow-lg cursor-pointer rounded-lg bg-white text-black p-5 space-y-4 transition ease-in hover:shadow-md active:shadow-sm"
              onClick={() => navigate("/admin/partner-accounts")}
            >
              <div className="flex items-center justify-between ">
                <div>
                  <h1 className="text-3xl font-medium capitalize">Payout</h1>
                </div>
                <div className="h-[45px] w-[45px]">
                  <img src={Payout} alt={Payout} />
                </div>
              </div>
              <div className="py-2">
                <p className="text-gray-500 text-base">
                  Complete Partner Off Ramping processes to Naira bank accounts.
                </p>
              </div>
            </article>
          </section>

          <section className="col-span-2">
            <div>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        label="Registrations"
                        value="1"
                        sx={{
                          fontSize: ".9rem",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      />
                      <Tab
                        label="Payouts"
                        value="2"
                        sx={{
                          fontSize: ".9rem",
                          fontWeight: "bold",
                          marginLeft: "20%",
                          textTransform: "capitalize",
                        }}
                      />
                    </TabList>
                  </Box>
                  <div>
                    <TabPanel
                      value="1"
                      sx={{ paddingX: "0rem", paddingY: "0.5rem" }}
                    >
                      <div className="font-700 rounded-lg text-black transact">
                        {registeredAccounts === null ? (
                          <div className="text-slate-500 justify-center flex items-center font-light bg-white p-3 rounded-lg">
                            <p>No Accounts </p>
                          </div>
                        ) : (
                          registeredAccounts
                            .slice(0)
                            .reverse()
                            .map((item, index) => (
                              <div className="bg-white a-box1" key={index}>
                                <div className="a-box2">
                                  <img
                                    src={Register}
                                    alt="Register"
                                    className="a-img1"
                                  />
                                  <div>
                                    <div
                                      className="a-h2 wide"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {item.name}
                                    </div>
                                    <div
                                      className="a-h2 thin"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {item.name.split(" ")[0]}
                                    </div>
                                  </div>
                                </div>
                                <div className="font-700 a-h2 date">
                                  <span>
                                    {moment(
                                      item.createdAt,
                                      moment.HTML5_FMT.DATETIME_LOCAL_MS
                                    ).format("MMMM DD, YYYY")}
                                  </span>
                                </div>
                                <div
                                  className="sm-none lg:block a-h2 a-mode"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.status} account
                                </div>

                                <div className="font-700 a-h2 status">
                                  <span style={{ color: "#04C45C" }}>
                                    Completed
                                  </span>
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel
                      value="2"
                      sx={{ paddingX: "0rem", paddingY: "0.5rem" }}
                    >
                      {" "}
                      <div className="font-700 rounded-lg text-black transact">
                        {transactions === null ? (
                          <div className="text-slate-500 justify-center flex items-center font-light bg-white p-3 rounded-lg">
                            <p>No Transactions </p>
                          </div>
                        ) : (
                          transactions
                            .slice(0)
                            .reverse()
                            .map((item, index) => (
                              <div className="bg-white a-box1" key={index}>
                                <div className="a-box2">
                                  <img
                                    src={Transaction}
                                    alt="Transaction"
                                    className="a-img1"
                                  />
                                  <div>
                                    <div
                                      className="a-h2 wide"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {item.fullName}
                                    </div>
                                    <div
                                      className="a-h2 thin"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {item.fullName.split(" ")[0]}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="sm-none lg:block a-h2 a-mode"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  Payout
                                </div>
                                <div className="font-700 a-h2 date">
                                  <span>
                                    {moment(
                                      item.doneAt,
                                      moment.HTML5_FMT.DATETIME_LOCAL_MS
                                    ).format("MMMM DD, YYYY")}
                                  </span>
                                </div>

                                <div
                                  className="font-700 a-h2 status"
                                  style={{
                                    color: "#1565D8",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {item.status === "delivered" && (
                                    <span style={{ color: "#04C45C" }}>
                                      Completed
                                    </span>
                                  )}
                                  {item.status === "pending" && (
                                    <span style={{ color: "#FF9900" }}>
                                      Processing
                                    </span>
                                  )}
                                  {item.status === "failed" && (
                                    <span style={{ color: "#E30A17" }}>
                                      Failed
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </TabPanel>
                  </div>
                </TabContext>
              </Box>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
