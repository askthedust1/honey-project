import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { GlobalError, IBanner } from '@/types';
import { fetchBanners, putBanners } from '@/features/banners/bannersThunk';

interface BannersState {
  items: IBanner[];
  loading: boolean;
  loadingPut: boolean;
  errorBanner: GlobalError | null;
}

const initialState: BannersState = {
  items: [],
  loading: false,
  loadingPut: false,
  errorBanner: null,
};

export const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // @ts-expect-error
      return action.payload.banners;
    });
    builder.addCase(fetchBanners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBanners.fulfilled, (state, { payload: banners }) => {
      state.items = banners;
      state.loading = false;
    });
    builder.addCase(fetchBanners.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(putBanners.pending, (state) => {
      state.loadingPut = true;
      state.errorBanner = null;
    });
    builder.addCase(putBanners.fulfilled, (state) => {
      state.loadingPut = false;
    });
    builder.addCase(putBanners.rejected, (state, { payload: error }) => {
      state.loadingPut = false;
      state.errorBanner = error || null;
    });
  },
});

export const selectBanners = (state: RootState) => state.banners.items;
export const selectBannersLoading = (state: RootState) => state.banners.loading;
export const selectBannersPutLoading = (state: RootState) => state.banners.loadingPut;
export const selectBannerError = (state: RootState) => state.banners.errorBanner;
