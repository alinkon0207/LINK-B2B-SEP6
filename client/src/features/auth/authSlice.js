import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  uID: null,
  user: null,
  token: null,
  accLock: null,
  accMode: null,
  linkTag: null,
  email: null,
};

// Register user
export const login = createAsyncThunk("auth");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const {
        name,
        accessToken,
        accountLock,
        accessMode,
        _id,
        linkTag,
        email,
      } = action.payload;
      state.uID = _id;
      state.user = name;
      state.token = accessToken;
      state.accMode = accessMode;
      state.accLock = accountLock;
      state.linkTag = linkTag;
      state.email = email;
    },
    logOut: (state, action) => {
      state.uID = null;
      state.user = null;
      state.token = null;
      state.accLock = null;
      state.accMode = null;
      state.linkTag = null;
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      createEntityAdapter.removeAll(state);
    });
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUID = (state) => state.auth.uID;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentAccLock = (state) => state.auth.accLock;
export const selectCurrentAccMode = (state) => state.auth.accMode;
export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentLinkTag = (state) => state.auth.linkTag;
