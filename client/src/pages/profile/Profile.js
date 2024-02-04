/* eslint-disable no-unused-vars */
import { BsArrowLeft } from 'react-icons/bs';
import { Button, Header } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  selectCurrentUser,
  selectCurrentEmail,
  selectCurrentLinkTag,
} from '../../features/auth/authSlice';

const Profile = () => {
  const navigate = useNavigate();
  const businessName = useSelector(selectCurrentUser);
  const email = useSelector(selectCurrentEmail);
  const linkTag = useSelector(selectCurrentLinkTag);

  return (
    <>
      <Header cross="none" />

      <div className="w-[90%] md:w-[70%] mx-auto mb-6">
        <Link
          to={-1}
          className="flex items-center space-x-3 text-primary text-xl font-medium mb-5"
        >
          <BsArrowLeft className="text-2xl" /> <span>Go back</span>
        </Link>

        <h1 className="text-black text-5xl font-semibold">Profile</h1>
        <p className="text-gray-500 text-lg mt-5">
          Update your personal details here
        </p>

        <form action="" className="space-y-8 mt-10 lg:mt-14">
          <div className="space-y-2">
            <p className="text-gray-500 text-lg">Business name</p>
            <div className="capitalize w-full bg-white text-lg text-slate-400 p-2 rounded-md font-medium outline-none cursor-not-allowed">
              {businessName}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 items-center">
            <div className="space-y-2">
              <p className="text-gray-500 text-lg">LINK Tag</p>
              <div className="w-full bg-white text-lg text-slate-400 p-2 rounded-md font-medium outline-none cursor-not-allowed">
                {linkTag}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 text-lg">Email</p>
              <div className="w-full bg-white text-lg text-slate-400 p-2 rounded-md font-medium outline-none cursor-not-allowed">
                {email}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 items-center">
            <div className="space-y-2">
              <h1 className="text-black text-3xl font-semibold">
                Update password
              </h1>
              <p className="text-gray-500 text-lg">
                Change your current password to a new one
              </p>
            </div>
            <div className="lg:justify-self-end">
              <button
                className={
                  'bg-secondary opacity-80 px-10 cursor capitalize space-x-2 w-full text-white font-normal text-base mb-4 mr-6 rounded-md py-2'
                }
                onClick={() => navigate('/user/change-password')}
              >
                Change password
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
