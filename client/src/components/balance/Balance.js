/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './Balance.css';
import Polygon from '../../assets/ngnc/polygon.svg';
import Solana from '../../assets/ngnc/solana.svg';
import Stellar from '../../assets/ngnc/stellar.svg';

import NGN from '../../assets/flags/NGN-round.svg';
import NGNC from '../../assets/images/svg/NGNC-logo.svg';
import { useEffect, useState } from 'react';

const networkImages = [
  {
    name: 'SOLANA',
    image: Solana,
  },
  {
    name: 'STELLAR',
    image: Stellar,
  },
  {
    name: 'POLYGON',
    image: Polygon,
  },
];

export const NGNBalance = ({ cur, amount, name, stats }) => {
  const [balance, setBalance] = useState();

  // Use Effect
  useEffect(() => {
    const newBalance = numCalc(amount);
    setBalance(newBalance);
  }, [cur]);

  // calculating fee
  const numCalc = (num) => {
    let newNum = num.toFixed(2);
    // let separator = newNum
    //   .toString()
    //   .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return newNum;
  };

  return (
    <article className="max-w-sm md:w-80 shadow-lg rounded-lg bg-white text-black py-3 px-5 space-x-2 space-y-5 transition ease-in hover:shadow-md active:shadow-sm">
      <div className="flex items-center justify-between ">
        <div>
          {stats === 'admin' ? (
            <h3 className="text-md md:text-lg font-semibold">{name}</h3>
          ) : (
            <h1 className="text-2xl md:text-3xl font-semibold">{cur}</h1>
          )}
        </div>
        <div className="h-[40px] w-[40px]">
          <img src={NGN} alt="NGN" />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{balance}</h1>
        <p className="text-gray-500 text-base md:text-xl">Available balance</p>
      </div>
    </article>
  );
};

export const NGNCBalance = ({ cur, amount }) => {
  return (
    <article className="max-w-sm md:w-80 shadow-lg rounded-lg bg-white text-black py-3 px-5 space-x-2 space-y-5 transition ease-in hover:shadow-md active:shadow-sm">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{cur}</h1>
        </div>
        <div className="h-[40px] w-[40px]">
          <img src={NGNC} alt="NGNC" />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{amount}</h1>
        <p className="text-gray-500 text-base md:text-xl">Available balance</p>
      </div>
    </article>
  );
};

export const NGNCNetwork = ({ cur, amount, title, image }) => {
  const [balance, setBalance] = useState();
  const filterImage = networkImages.filter((item) => item.name === image);

  // Use Effect
  useEffect(() => {
    const newBalance = numCalc(amount);
    setBalance(newBalance);
  }, [cur]);

  // calculating fee
  const numCalc = (num) => {
    let newNum = num.toFixed(2);
    // let separator = newNum
    //   .toString()
    //   .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return newNum;
  };

  return (
    <article className="max-w-sm md:w-80 shadow-lg rounded-lg bg-white text-black py-2 px-3 space-y-4 transition ease-in hover:shadow-md active:shadow-sm">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-xl font-medium capitalize">{title}</h1>
        </div>
        <div className="h-[40px] w-[55px]">
          <img src={filterImage[0].image} alt={image} />
        </div>
      </div>
      <div className="py-2">
        <h1 className="text-3xl font-semibold">{balance}</h1>
        <p className="text-gray-500 text-base md:text-xl">Available balance</p>
      </div>
    </article>
  );
};
