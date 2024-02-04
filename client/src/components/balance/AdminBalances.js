import { NGNBalance } from './Balance';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllVirtualAccountsQuery } from '../../services/accountApi';

export default function AdminBalances() {
  const [accountData, setAccountData] = React.useState([]);

  const { data, isLoading, isFetching } = useGetAllVirtualAccountsQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setAccountData(data.accounts);
    }
  }, [data, isLoading, isFetching]);

  return (
    <div className="block space-y-5 md:space-y-0 md:flex justify-items-start items-center flex-wrap gap-10">
      {/* NGN account card fetched from Backend */}
      {accountData?.map((data, index) => (
        <div key={index}>
          <Link
            to={{
              pathname: '/admin/withdraw',
            }}
            state={{
              accountName: data.account_name,
              accountNumber: data.account_number,
              accountType: data.account_type,
              balance: data.balance,
              bankName: data.bank_name,
              accountId: data.user,
            }}
          >
            <NGNBalance
              cur={data.currency}
              amount={data.balance}
              name={data.account_name}
              stats={'admin'}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
