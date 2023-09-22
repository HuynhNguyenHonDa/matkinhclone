import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CategoryModel } from "../../../models/category";
import axios from "axios";
import {
  fetchTreeCategory,
  TreeCategoryModal,
} from "../../../api/categoryApi/categoryApi";

export interface CategoryState {
  categoryTree: TreeCategoryModal[];
  category?: Array<CategoryModel>;
  status: "idle" | "loading" | "failed" | "fullfilled";
}

const initialState: CategoryState = {
  categoryTree: [],
  category: [],
  status: "idle",
};

export const categoryFetchAsync = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    let categories: Array<CategoryModel> = [];
    await axios
      .get(`https://matkinhbaotin.com/api/category/`)
      .then((res) => {
        categories = res.data;
        getCategory(categories);
      })
      .catch((error) => console.log(error));
    return categories;
  }
);

export const fetchTreeCategoryAsync = createAsyncThunk(
  "category/fetchTreeCategory",
  async () => {
    const response = await fetchTreeCategory();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategory(state, action) {
      if (!action.payload) {
        state.status = "loading";
      }
      state.category = action.payload;
      state.status = "fullfilled";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryFetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(categoryFetchAsync.fulfilled, (state, action) => {
        state.category = action.payload;
        state.status = "fullfilled";
      })
      .addCase(categoryFetchAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchTreeCategoryAsync.fulfilled, (state, action) => {
        state.categoryTree = action.payload;
      });
  },
});
export const selectCategory = (state: RootState) => state.category.category;
export const isLoading = (state: RootState) => state.category.status;

export const { getCategory } = categorySlice.actions;

export default categorySlice.reducer;
