import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ConfigImageModel,
  fetchConfigImage,
  fetchFonts,
  fetchPromotionConfig,
} from "../../../api/configurationApi/configImages.Api";
import { PromotionConfigModel } from "../../../models/promotionConfigModel";

export interface ContactState {
  configImage?: ConfigImageModel;
  promotionConfig?: PromotionConfigModel;
  font: string;
  status: "idle" | "loading" | "fulfilled" | "failed";
}

const initialState: ContactState = {
  font: "garamond",
  configImage: undefined,
  status: "idle",
};

export const fetchFontAsync = createAsyncThunk("config/fetchFont", async () => {
  const response = await fetchFonts();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchConfigImageAsync = createAsyncThunk(
  "counter/fetchConfigImage",
  async () => {
    const response = await fetchConfigImage();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchPromotionConfigAsync = createAsyncThunk(
  "counter/fetchPromotionConfig",
  async () => {
    const response = await fetchPromotionConfig();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const configSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfigImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConfigImageAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.configImage = action.payload;
      })
      .addCase(fetchConfigImageAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchPromotionConfigAsync.fulfilled, (state, action) => {
        state.promotionConfig = action.payload;
      })
      .addCase(fetchFontAsync.fulfilled, (state, action) => {
        state.font = action.payload.font ?? state.font;
      });
  },
});

export default configSlice.reducer;
