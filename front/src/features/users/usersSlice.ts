import { createSlice } from '@reduxjs/toolkit';
import { login, register, roleCheck } from './usersThunk';
import { RootState } from '@/store/store';
import { GlobalError, ICheck, IUser, ValidationError } from '@/types';

export interface UserState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: ValidationError | null | GlobalError;
  loginLoading: boolean;
  loginError: GlobalError | null;
  isAdmin: ICheck | null;
  isAdminLoading: boolean;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  isAdmin: null,
  isAdminLoading: true,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })

      .addCase(register.fulfilled, (state, { payload: userResponse }) => {
        state.registerLoading = false;
        state.user = userResponse.user;
      })

      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerError = error || null;
        state.registerLoading = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })

      .addCase(login.fulfilled, (state, { payload: userResponse }) => {
        state.loginLoading = false;
        state.user = userResponse;
      })

      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginError = error || null;
        state.loginLoading = false;
      });

    builder
      .addCase(roleCheck.pending, (state) => {
        state.isAdminLoading = true;
      })

      .addCase(roleCheck.fulfilled, (state, { payload: userResponse }) => {
        state.isAdminLoading = false;
        state.isAdmin = userResponse;
      })

      .addCase(roleCheck.rejected, (state) => {
        state.isAdminLoading = false;
      });
  },
});

export const { unsetUser } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectRole = (state: RootState) => state.users.isAdmin;
export const selectRoleLoading = (state: RootState) => state.users.isAdminLoading;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
