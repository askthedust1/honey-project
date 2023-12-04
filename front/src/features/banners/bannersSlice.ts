import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { IBanner, IChangeBanner } from '@/types';
import { fetchBanners } from '@/features/banners/bannersThunk';

interface BannersState {
  items: IBanner[];
  loading: boolean;
}

const initialState: BannersState = {
  items: [],
  loading: false,
};

export const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    changeBanner: (state, action: PayloadAction<IChangeBanner>) => {
      const banner = state.items.findIndex(
        (item) => item.priority === parseInt(action.payload.priority),
      );
      state.items[banner].image = action.payload.image;
    },
  },
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
  },
});

export const { changeBanner } = bannersSlice.actions;
export const selectBanners = (state: RootState) => state.banners.items;
export const selectBannersLoading = (state: RootState) => state.banners.loading;
