/* eslint-disable no-unused-vars */
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { CodeIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../assets/images/svg/avatar.svg";

import { selectCurrentUser } from "../../features/auth/authSlice";
import { logOut } from "../../features/auth/authSlice";

export default function ProfileButton() {
  const [profileName, setProfileName] = useState("");
  const userName = useSelector(selectCurrentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    slitUserName(userName);
  });

  // slit user name
  const slitUserName = (name) => {
    const user = name.split(" ");
    return setProfileName(user[0]);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/auth/login");
  };

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="capitalize inline-flex justify-center items-center space-x-1 w-full px-3 py-1 text-[15px] font-medium text-[#696F79] border border-gray-300 bg-transparent rounded-md bg-opacity-90 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition ease-in-out duration-200">
            <div className="h-[30px] w-[30px] rounded-full bg-blue-100 text-primary flex items-center justify-center">
              {profileName.charAt(0)}
            </div>
            <span>{profileName}</span>
            <HiChevronDown
              className="text-xl text-[#757679c2]"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-[9.5rem] mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`space-x-2 ${
                      active ? "bg-gray-100 text-[#696F79]" : "text-[#696F79]"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => {
                      navigate("/user/profile");
                    }}
                  >
                    {active ? (
                      <ProfileIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <ProfileInactiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    <span>Profile</span>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`space-x-2 ${
                      active ? "bg-gray-100 text-[#696F79]" : "text-[#696F79]"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <HelpActiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <HelpActiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    <span>Help</span>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`space-x-2 ${
                      active ? "bg-gray-100 text-[#696F79]" : "text-[#696F79]"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    href="https://docs.ngnc.online"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {active ? (
                      <CodeIcon className="w-5 h-5" />
                    ) : (
                      <CodeIcon className="w-5 h-5" />
                    )}
                    <span>Developer</span>
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 pb-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`space-x-2 ${
                      active ? "bg-gray-100 text-[#696F79]" : "text-[#696F79]"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={handleLogout}
                  >
                    {active ? (
                      <LogoutActiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <LogoutInactiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    <span>Logout</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function ProfileIcon() {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 19 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.18649 11.6813C9.06982 11.6697 8.92982 11.6697 8.80149 11.6813C6.02482 11.588 3.81982 9.31301 3.81982 6.51301C3.81982 3.65467 6.12982 1.33301 8.99982 1.33301C11.8582 1.33301 14.1798 3.65467 14.1798 6.51301C14.1682 9.31301 11.9632 11.588 9.18649 11.6813Z"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.35334 15.986C0.530007 17.876 0.530007 20.956 3.35334 22.8343C6.56167 24.981 11.8233 24.981 15.0317 22.8343C17.855 20.9443 17.855 17.8643 15.0317 15.986C11.835 13.851 6.57334 13.851 3.35334 15.986Z"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileInactiveIcon() {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 19 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.18649 11.6813C9.06982 11.6697 8.92982 11.6697 8.80149 11.6813C6.02482 11.588 3.81982 9.31301 3.81982 6.51301C3.81982 3.65467 6.12982 1.33301 8.99982 1.33301C11.8582 1.33301 14.1798 3.65467 14.1798 6.51301C14.1682 9.31301 11.9632 11.588 9.18649 11.6813Z"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.35334 15.986C0.530007 17.876 0.530007 20.956 3.35334 22.8343C6.56167 24.981 11.8233 24.981 15.0317 22.8343C17.855 20.9443 17.855 17.8643 15.0317 15.986C11.835 13.851 6.57334 13.851 3.35334 15.986Z"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelpInactiveIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8335 21.5017H15.1668L9.97515 24.955C9.20515 25.4683 8.16683 24.92 8.16683 23.9867V21.5017C4.66683 21.5017 2.3335 19.1684 2.3335 15.6684V8.66829C2.3335 5.16829 4.66683 2.83496 8.16683 2.83496H19.8335C23.3335 2.83496 25.6668 5.16829 25.6668 8.66829V15.6684C25.6668 19.1684 23.3335 21.5017 19.8335 21.5017Z"
        stroke="#696F79"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0001 13.2529V13.008C14.0001 12.2146 14.4901 11.7946 14.9801 11.4563C15.4585 11.1296 15.9367 10.7096 15.9367 9.93964C15.9367 8.8663 15.0734 8.00293 14.0001 8.00293C12.9268 8.00293 12.0635 8.8663 12.0635 9.93964"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9946 16.0413H14.0051"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelpActiveIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8335 21.5017H15.1668L9.97515 24.955C9.20515 25.4683 8.16683 24.92 8.16683 23.9867V21.5017C4.66683 21.5017 2.3335 19.1684 2.3335 15.6684V8.66829C2.3335 5.16829 4.66683 2.83496 8.16683 2.83496H19.8335C23.3335 2.83496 25.6668 5.16829 25.6668 8.66829V15.6684C25.6668 19.1684 23.3335 21.5017 19.8335 21.5017Z"
        stroke="#696F79"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0001 13.2529V13.008C14.0001 12.2146 14.4901 11.7946 14.9801 11.4563C15.4585 11.1296 15.9367 10.7096 15.9367 9.93964C15.9367 8.8663 15.0734 8.00293 14.0001 8.00293C12.9268 8.00293 12.0635 8.8663 12.0635 9.93964"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9946 16.0413H14.0051"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutInactiveIcon() {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3833 9.22262C10.745 5.02262 12.9033 3.30762 17.6283 3.30762H17.78C22.995 3.30762 25.0833 5.39595 25.0833 10.6109V18.2176C25.0833 23.4326 22.995 25.5209 17.78 25.5209H17.6283C12.9383 25.5209 10.78 23.8293 10.395 19.6993"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4998 14.4023H4.22314"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.82484 10.4941L2.9165 14.4025L6.82484 18.3108"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutActiveIcon() {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3833 9.22262C10.745 5.02262 12.9033 3.30762 17.6283 3.30762H17.78C22.995 3.30762 25.0833 5.39595 25.0833 10.6109V18.2176C25.0833 23.4326 22.995 25.5209 17.78 25.5209H17.6283C12.9383 25.5209 10.78 23.8293 10.395 19.6993"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4998 14.4023H4.22314"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.82484 10.4941L2.9165 14.4025L6.82484 18.3108"
        stroke="#696F79"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
