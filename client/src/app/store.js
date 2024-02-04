import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userAuthApi } from "../services/userAuthAPi";
import { transactionApi } from "../services/transactionApi";
import { stellarApi } from "../services/stellarApi";
import { accountApi } from "../services/accountApi";
import { settlementApi } from "../services/settlementApi";
import { walletTransactionApi } from "../services/walletTransactionApi";
import { rateApi } from "../services/rateApi";
import authReducer from "../features/auth/authSlice";
import formStepReducer from "../features/formStepSlice";
import networkReducer from "../features/networkInputSlice";
import buyReducer from "../features/buySlice";
import sellReducer from "../features/sellSlice";
import zebecReducer from "../features/zebecSlice";
import rateReducer from "../features/rateSlice";
import ngncWalletSliceReducer from "../features/ngncWalletSlice";
import settlementTabSliceReducer from "../features/settlementTabSlice";
import settlementSliceReducer from "../features/settlementSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [stellarApi.reducerPath]: transactionApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [settlementApi.reducerPath]: settlementApi.reducer,
    [walletTransactionApi.reducerPath]: walletTransactionApi.reducer,
    [rateApi.reducerPath]: rateApi.reducer,
    auth: persistedReducer,
    formStep: formStepReducer,
    networkSelector: networkReducer,
    buySlice: buyReducer,
    sellSlice: sellReducer,
    zebec: zebecReducer,
    ngncWallet: ngncWalletSliceReducer,
    rates: rateReducer,
    settlementTab: settlementTabSliceReducer,
    settlement: settlementSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userAuthApi.middleware,
      transactionApi.middleware,
      stellarApi.middleware,
      accountApi.middleware,
      settlementApi.middleware,
      walletTransactionApi.middleware,
      rateApi.middleware
    ),
});

export default store;
