import { configureStore } from "@reduxjs/toolkit";
import formStepReducer from "../features/formStepSlice";
import networkReducer from "../features/networkInputSlice";
import buyReducer from "../features/buySlice";
import sellReducer from "../features/sellSlice";

export default configureStore({
  reducer: {
    formStep: formStepReducer,
    networkSelector: networkReducer,
    buySlice: buyReducer,
    sellSlice: sellReducer,
  },
});
