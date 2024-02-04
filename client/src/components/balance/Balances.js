/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUID } from "../../features/auth/authSlice";
import { setDetails } from "../../features/ngncWalletSlice";
import {
  useFetchVirtualAccountsQuery,
  useFetchWalletQuery,
} from "../../services/accountApi";
import { NGNBalance, NGNCBalance } from "./Balance";

export default function Balances() {
  const [accountData, setAccountData] = React.useState([]);
  const [ngncAccountData, setNgncAccountData] = React.useState([]);
  const [ngncBalance, setNgncBalance] = React.useState(0);
  const userId = useSelector(selectCurrentUID);
  const dispatch = useDispatch();

  const { data, isLoading, isFetching } = useFetchVirtualAccountsQuery(userId, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: ngncData,
    isLoading: stillLoading,
    isFetching: stillFetching,
  } = useFetchWalletQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setAccountData(data?.accounts);
    }
  }, [data, isLoading, isFetching]);

  useEffect(() => {
    if (!stillLoading && !stillFetching) {
      setNgncAccountData(ngncData?.accounts[0]);
      setNgncBalance(ngncData?.totalNgncbalance);
      dispatch(setDetails({ addresses: ngncData?.accounts[0]?.addresses }));
    }
  }, [ngncData, stillLoading, stillFetching]);

  return (
    <div className="block space-y-5 md:space-y-0 md:flex justify-items-start items-center flex-wrap gap-10">
      {/* NGN account card fetched from Backend */}
      {accountData?.map((data, index) => (
        <div key={index}>
          <Link
            to={{
              pathname: "/user/ngn-account",
            }}
            state={{
              accountName: data.account_name,
              accountNumber: data.account_number,
              accountType: data.account_type,
              balance: data.balance,
              bankName: data.bank_name,
              bankAddress: data.bank_address,
            }}
          >
            <NGNBalance cur={data.currency} amount={data.balance} />
          </Link>
        </div>
      ))}

      {/* NGNC account card fixed UI */}
      <div>
        <Link
          to="/user/ngnc-account"
          state={{
            ngncAccountData: ngncAccountData?.addresses,
            balance: ngncBalance,
          }}
        >
          <NGNCBalance cur="NGNC" amount={ngncBalance} />
        </Link>
      </div>
    </div>
  );
}
