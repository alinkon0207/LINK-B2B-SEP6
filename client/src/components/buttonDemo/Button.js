/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Bridge from '@ngnc/bridge';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const Button = ({
  icon,
  link,
  type,
  bgColor,
  ringColor,
  text,
  paddingX,
  paddingY,
  spinner,
  width,
}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const widget = new Bridge({
        key: 'ngnc_p_lk_e23acdd77ceccf832496d22b7027f5470656766ad59b5362d3489e196465534c',
        type: type,
        data: {
          amount: '20000',
          network: 'Polygon',
          wallet_address: '',
        },

        onSuccess: (chargeObject) => {
          console.log(chargeObject);
        },

        onEvent: (eventName, data) => {
          console.log(eventName, ': ', data);
          // console.log(data);
        },
      });

      widget.setup();
      widget.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        className={`capitalize flex items-center justify-center space-x-2 ${width} transition-transform ease-in-out duration-200 text-white font-normal text-base mb-4 mr-6 rounded-md ${bgColor} ${paddingX} ${
          paddingY ? paddingY : 'py-2'
        } active:ring ${ringColor} transition duration-200 ease-out cursor-pointer ${
          icon && 'space-x-2'
        }`}
        onClick={handleSubmit}
      >
        {icon && <span className="text-xl ">{icon}</span>}
        <span>{text}</span>
        {isLoading && <ImSpinner2 className="text-white animate-spin " />}
      </button>
    </div>
  );
};

export default Button;
