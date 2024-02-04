/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Activities, Orders, Balances, Navbar } from "../../components";
import { selectCurrentUser } from "../../features/auth/authSlice";

export default function Dashboard() {
  const [value, setValue] = useState("1");
  const userName = useSelector(selectCurrentUser);

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
            Hi, {userName}
          </h1>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <section className="my-5">
            <Balances />
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
                        label="NGN Activity"
                        value="1"
                        sx={{
                          fontSize: ".9rem",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      />
                      <Tab
                        label="NGNC Activity"
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
                      <Activities />
                    </TabPanel>
                    <TabPanel
                      value="2"
                      sx={{ paddingX: "0rem", paddingY: "0.5rem" }}
                    >
                      <Orders />
                    </TabPanel>
                  </div>
                </TabContext>
              </Box>
            </div>
          </section>
        </div>
        <section className="md:flex items-center justify-between space-y-5 md:space-y-0 md:space-x-5 mt-10">
          <div className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary">
            <div className="flex items-center space-x-5">
              <PaymentLink
                className="w-20 h-20 md:w-16 md:h-16 lg:w-12 lg:h-12 mr-2"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <h1 className="text-black text-xl font-medium">
                  Payment link{" "}
                  <span className=" bg-primary p-1 text-sm text-white rounded">
                    Coming soon
                  </span>
                </h1>
                <p className="text-gray-500 text-sm md:text-lg">
                  Generate a payment link and receive payments without any API
                  integrations
                </p>
              </div>
            </div>
            <div>
              <BsChevronRight className="text-gray-400 text-2xl" />
            </div>
          </div>

          <div className="bg-white rounded-md flex items-center justify-between p-6 cursor-pointer transition duration-300 ease-in-out hover:shadow-sm active:ring-4 active:ring-primary">
            <div className="flex items-center space-x-5">
              <Yields
                className="w-20 h-20 md:w-16 md:h-16 lg:w-12 lg:h-12 mr-2"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <h1 className="text-black text-xl font-medium">
                  Yields{" "}
                  <span className=" bg-primary p-1 text-sm text-white rounded">
                    Coming soon
                  </span>
                </h1>
                <p className="text-gray-500 text-sm md:text-lg">
                  Lock USDC and earn interest daily at an APY rate of up to 7%
                </p>
              </div>
            </div>
            <div>
              <BsChevronRight className="text-gray-400 text-2xl" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function PaymentLink(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39.5" cy="39.5" r="39.5" fill="#DBE7FF" />
      <path
        d="M21.0847 39C19.3073 36.8727 18.3334 34.1888 18.333 31.4167C18.333 24.8733 23.6847 19.5 30.2497 19.5H41.083C47.6263 19.5 52.9997 24.8733 52.9997 31.4167C52.9997 37.96 47.648 43.3333 41.083 43.3333H35.6663"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58.915 39.0001C60.6924 41.1274 61.6663 43.8113 61.6667 46.5834C61.6667 53.1267 56.315 58.5001 49.75 58.5001H38.9167C32.3733 58.5001 27 53.1267 27 46.5834C27 40.0401 32.3517 34.6667 38.9167 34.6667H44.3333"
        stroke="#1565D8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Yields(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39.5" cy="39.5" r="39.5" fill="#DBE7FF" />
      <path
        d="M22.5 21.5V51.25C22.5 54.155 24.845 56.5 27.75 56.5H57.5"
        stroke="#1565D8"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.75 47.75L35.7825 38.37C37.1125 36.83 39.475 36.725 40.91 38.1775L42.5725 39.84C44.0075 41.275 46.37 41.1875 47.7 39.6475L55.75 30.25"
        stroke="#1565D8"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
