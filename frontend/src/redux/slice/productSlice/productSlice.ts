import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../../../models/product";
import {
  getProductById,
  fetchProductByCategory,
} from "../../../api/productApi/productsApi";
import axios from "axios";
import { RootState } from "../../store";
import { fetchProductFilterAsync } from "../productFilterSlice/productsFilterSlice";

export interface ProductState {
  products?: Array<ProductModel>;
  productsFliter?: Array<ProductModel>;
  status: "idle" | "loading" | "failed" | "fullfilled";
  selectedProduct?: ProductModel;
  bestSellerProds?: Array<ProductModel>;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
};

export const getProductByIdAsync = createAsyncThunk(
  "product/getProductById",
  async (id: number) => {
    const product = await getProductById(id);
    return product;
  }
);

export const fetchProductByCategoryAsync = createAsyncThunk(
  "product/fetchProductByCategory",
  async (id: number) => {
    const product = await fetchProductByCategory(id);
    return product;
  }
);

export const productFetchAsync = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    let products: Array<ProductModel> = [];
    await axios
      .get(`http://103.90.227.238/api/product/`)
      .then((res) => {
        products = res.data;
        // getProduct(products);
      })
      .catch((error) => console.log(error));
    return products;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct(state, action) {
      if (!action.payload) {
        state.status = "loading";
      }
      state.products = action.payload;
      state.status = "fullfilled";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productFetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productFetchAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "fullfilled";
        state.bestSellerProds = state.products?.sort((prev, current) => {
          return current.no_of_order - prev.no_of_order;
        });
      })
      .addCase(productFetchAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.selectedProduct = action.payload;
        state.bestSellerProds = state.products?.sort((prev, current) => {
          return current.no_of_order - prev.no_of_order;
        });
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductByIdAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductFilterAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.productsFliter = action.payload;
      })
      .addCase(fetchProductByCategoryAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.productsFliter = action.payload;
      });
  },
});

export const loadingState = (state: RootState) => state.product.status;

export const { getProduct } = productSlice.actions;

export default productSlice.reducer;
