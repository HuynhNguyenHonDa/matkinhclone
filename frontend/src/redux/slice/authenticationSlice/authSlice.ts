import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, register } from "../../../api/authApi/authenticationApi";
import { LoginModel } from "../../../models/login";
import { RootState } from "../../store";
import { loginHelper, logoutHelper } from "../../../common/helper/authHelper";
import { RegisterModel } from "../../../models/register";
import jwtDecode from "jwt-decode";
export interface AuthenticationState {
  token?: null;
  status: "idle" | "loading" | "failed" | "fulfilled";
  isAuthenticated: boolean;
  userName?: string;
}

const initialState: AuthenticationState = {
  token: null,
  status: "idle",
  isAuthenticated: false,
  userName: undefined,
};

export const authRequestAsync = createAsyncThunk(
  "authentication/fetchToken",
  (loginInfo: LoginModel) => {
    const response = login(loginInfo);
    return response;
  }
);

export const registerRequestAsync = createAsyncThunk(
  "authentication/register",
  async (registerInfor: RegisterModel) => {
    const response = register(registerInfor);
    return response;
  }
);

export const checkValidTokenAsync = createAsyncThunk(
  "authentication/checkValidToken",
  async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const data = jwtDecode(token);
      return data;
    }
    return;
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authRequest(state, action) {
      if (!action.payload) {
        state.status = "loading";
      }
      state.token = action.payload;
      state.status = "fulfilled";
    },
    logout(state) {
      state.isAuthenticated = false;
      logoutHelper();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authRequestAsync.fulfilled, (state, action) => {
        state.token = action.payload;
        if (!state.token) {
          state.status = "failed";
          return;
        }
        state.status = "fulfilled";
        loginHelper(state.token);
        state.isAuthenticated = true;
        state.userName = action.meta.arg.email;
      })
      .addCase(authRequestAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(registerRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerRequestAsync.fulfilled, (state, action) => {
        if (action.payload === "201") {
          state.status = "fulfilled";
          return;
        }
        state.status = "failed";
      })
      .addCase(registerRequestAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkValidTokenAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
        }
      });
  },
});
export const isLoading = (state: RootState) => state.authentication.status;
export const isAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;

export const { authRequest, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
