import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import incoming from '../../assets/images/png/incoming.png';
import outgoing from '../../assets/images/png/outgoing.png';
import { selectCurrentUID } from '../../features/auth/authSlice';
import { useGetTransactionQuery } from '../../services/walletTransactionApi';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const userId = useSelector(selectCurrentUID);

  const { data, isFetching } = useGetTransactionQuery(userId, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    if (!isFetching) {
      setOrders(data.withdrawals);
    }
  }, [data, isFetching]);

  return (
    <>
      <div className="font-700 rounded-lg text-black transact">
        {orders === null ? (
          <div className="text-slate-500 justify-center flex items-center font-light bg-white p-3 rounded-lg">
            <p>No NGNC Activity </p>
          </div>
        ) : (
          orders
            .slice(0)
            .reverse()
            .map((item, index) => (
              <div
                className="bg-white o-box1"
                key={index}
                // style={{
                //   color: 'black',
                //   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.20)',
                //   borderRadius: 7,
                // }}
              >
                <div className="o-box2">
                  <img
                    src={item.transferType === 'deposit' ? incoming : outgoing}
                    alt="order"
                    className="o-img1"
                  />
                  <span
                    className="font-700 o-h2"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {item.wallet_address.slice(0, 9) + '...'}
                  </span>
                </div>
                <div className="font-700 a-h2 amount">
                  <span>{item.amount} </span>
                </div>
                <div
                  className="sm-none lg:block a-h2 a-mode"
                  style={{ textTransform: 'capitalize' }}
                >
                  {item.transferType}
                </div>
                <div className="font-700 a-h2 date">
                  <span>{item.doneAt} </span>
                </div>
                <div
                  className="font-700 o-h2 status"
                  style={{ color: item.color, textTransform: 'capitalize' }}
                >
                  {item.status === 'delivered' && (
                    <span style={{ color: '#04C45C' }}>Delivered</span>
                  )}
                  {item.status === 'pending' && (
                    <span style={{ color: '#FF9900' }}>Processing</span>
                  )}
                  {item.status === 'failed' && (
                    <span style={{ color: '#E30A17' }}>Failed</span>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default Orders;
