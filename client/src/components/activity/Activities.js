/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import incoming from '../../assets/images/png/incoming.png';
import outgoing from '../../assets/images/png/outgoing.png';
import { selectCurrentUID } from '../../features/auth/authSlice';
import { useGetWithdrawalQuery } from '../../services/transactionApi';
import './Activities.css';

const Activities = () => {
  const [activity, setActivity] = React.useState([]);
  const userId = useSelector(selectCurrentUID);
  const { data, isFetching } = useGetWithdrawalQuery(userId, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    if (!isFetching) {
      setActivity(data.withdrawals);
    }
  }, [data, isFetching]);

  return (
    <>
      <div className="font-700 rounded-lg text-black transact">
        {activity === null ? (
          <div className="text-slate-500 justify-center flex items-center font-light bg-white p-3 rounded-lg">
            <p>No NGN Activities </p>
          </div>
        ) : (
          activity
            .slice(0)
            .reverse()
            .map((item, index) => (
              <div className="bg-white a-box1" key={index}>
                <div className="a-box2">
                  <img
                    src={item.transferType === 'deposit' ? incoming : outgoing}
                    alt="activity"
                    className="a-img1"
                  />
                  <div>
                    <div
                      className="a-h2 wide"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {item.account_name}
                    </div>
                    <div
                      className="a-h2 thin"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {item.account_name.split(' ')[0]}
                    </div>
                  </div>
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
                  className="font-700 a-h2 status"
                  style={{ color: '#1565D8', textTransform: 'capitalize' }}
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
export default Activities;
