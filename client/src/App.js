/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './App.css';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Widget from './components/Home';
import { Confirm } from './components/Confirm';
import {
  Deposit,
  Dashboard,
  Profile,
  NgnAccount,
  DepositPayment,
  Withdrawal,
  WithdrawalBank,
  WithdrawPayment,
  WithdrawalWallet,
  AdminLogin,
  KybAccess,
  Register,
  HomePage,
  Accounts,
  Request,
  Payout,
  Home,
  BusinessLogin,
  ForgotPassword,
  ChangePassword,
  ResetPassword,
  Transfer,
  SEP,
} from './pages';
import UserProtectedRoutes from './utils/userProtectedRoutes';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import { selectCurrentToken, logOut } from './features/auth/authSlice';
import NgncAccount from './pages/ngncAccount/NgncAccount';
import NgncWallet from './pages/ngncAccount/NgncWallet';
import StellarDeposit from './pages/stellar/deposit/StellarDeposit';
import StellarDepositAccount from './pages/stellar/deposit/StellarDepositAccount';
import StellarDepositPOP from './pages/stellar/deposit/StellarDepositPOP';
import StellarDepositKyc from './pages/stellar/deposit/BuyKyc';
import StellarDepositSummary from './pages/stellar/deposit/DepositSummary';
import StellarWithdraw from './pages/stellar/withdraw/StellarWidraw';
import StellarWithdrawKyc from './pages/stellar/withdraw/SellKyc';
import StellarWithdrawSummary from './pages/stellar/withdraw/WithdrawSummary';
import { WithdrawSuccess } from './pages/stellar/withdraw/WithdrawSuccess';
import { DepositSuccess } from './pages/stellar/deposit/DepositSuccess';
import AdminWithdraw from './pages/admin/AdminWithdraw';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    verify_jwt_expiration();
  }, [token]);

  function verify_jwt_expiration() {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(logOut());
      }
    }
  }

  return (
    <div className="container">
      <Toaster />
      <Router>
        <div className="app__body">
          <Routes>
            {/* Development Route, used for testing */}
            <Route path="/widget/demo" element={<SEP />} />

            {/* User Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/user/kyb" element={<KybAccess />} />
            <Route path="/auth/login" element={<BusinessLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/user/forgot-password" element={<ForgotPassword />} />
            <Route path="/user/change-password" element={<ChangePassword />} />
            <Route path="/user/reset-password" element={<ResetPassword />} />

            {/* User protected Routes for Un-authorized People */}
            <Route element={<UserProtectedRoutes />}>
              <Route exact path="/user/dashboard" element={<Dashboard />} />
              <Route exact path="/user/profile" element={<Profile />} />
              <Route exact path="/user/ngn-account" element={<NgnAccount />} />
              <Route
                exact
                path="/user/ngnc-account"
                element={<NgncAccount />}
              />
              <Route
                exact
                path="/user/:id-ngnc-wallet"
                element={<NgncWallet />}
              />
              <Route
                exact
                path="/deposit/pay-method"
                element={<DepositPayment />}
              />
              <Route
                exact
                path="/withdraw/pay-method"
                element={<WithdrawPayment />}
              />
              <Route exact path="/withdraw/widget" element={<Widget />} />
              <Route exact path="/withdraw/bank" element={<WithdrawalBank />} />
              <Route exact path="/request/success" element={<Confirm />} />
              <Route exact path="/transfer" element={<Transfer />} />
              <Route exact path="/withdraw-status" element={<Payout />} />
              <Route exact path="/request-status" element={<Request />} />
            </Route>

            {/* /////////////////////////////////////////////////////// */}

            {/* Admin protected Routes for Un-authorized entry */}
            <Route element={<AdminProtectedRoutes />}>
              {/* For Admin user */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/create-account" element={<Register />} />
              <Route path="/admin/partner-accounts" element={<Accounts />} />
              <Route path="/admin/withdraw" element={<AdminWithdraw />} />
            </Route>

            {/* /////////////////////////////////////////////////////// */}

            {/* ///////////// */}
            <Route exact path="/stellar/deposit" element={<StellarDeposit />} />
            <Route
              exact
              path="/stellar/deposit/kyc"
              element={<StellarDepositKyc />}
            />
            <Route
              exact
              path="/stellar/proof-of-payment"
              element={<StellarDepositPOP />}
            />
            <Route
              exact
              path="/stellar/deposit-account"
              element={<StellarDepositAccount />}
            />
            <Route
              exact
              path="/stellar/deposit-status"
              element={<StellarDepositSummary />}
            />
            <Route exact path="/deposit-success" element={<DepositSuccess />} />
            <Route
              exact
              path="/stellar/withdraw"
              element={<StellarWithdraw />}
            />
            <Route
              exact
              path="/stellar/withdraw/kyc"
              element={<StellarWithdrawKyc />}
            />
            <Route
              exact
              path="/stellar/withdraw-status"
              element={<StellarWithdrawSummary />}
            />
            <Route
              exact
              path="/stellar/withdraw-success"
              element={<WithdrawSuccess />}
            />
            <Route exact path="/stellar/status" element={<Payout />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
