import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ProductOrderedModel } from "../../../models/productOrdered";
import {
  submitOrder,
  submitOrderNoToken,
} from "../../../api/shoppingCartApi/shoppingCartApi";
import { ProductOrderNoTokenModel } from "../../../models/ProductOrderNoTokenModel";

export interface ShoppingCartState {
  productsOrdered?: Array<ProductOrderedModel>;
  productsOrderedNoToken?: Array<ProductOrderedModel>;
  status: "idle" | "loading" | "failed" | "fullfilled";
  orderStatus: "idle" | "pending" | "failed" | "fullfilled";
}
const initialState: ShoppingCartState = {
  productsOrdered: [],
  status: "idle",
  orderStatus: "idle",
};

export const submitOrderAsync = createAsyncThunk(
  "product/getProductById",
  async (order?: Array<ProductOrderedModel>) => {
    const product = await submitOrder(order);
    return product;
  }
);

export const submitOrderNoTokenAsync = createAsyncThunk(
  "product/submitOrderNoToken",
  async (order?: ProductOrderNoTokenModel) => {
    const product = await submitOrderNoToken(order);
    return product;
  }
);
export const shoppingCartSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getShoppingCart(state, action) {
      if (!action.payload) {
        state.status = "loading";
      }
      state.productsOrdered = action.payload;
      state.status = "fullfilled";
    },
    addMoreProduct(state, action) {
      action.payload.quantity = 1;
      if (!action.payload) {
        return;
      }
      let prodIndex = -1;
      state.productsOrdered?.find((prod, index) => {
        if (prod.id === action.payload.id) {
          prodIndex = index;
        }
        return (
          prod.id === action.payload.id && prod.colors === action.payload.colors
        );
      });

      if (
        state.productsOrdered &&
        state.productsOrdered.length > 0 &&
        prodIndex >= 0
      ) {
        if (state.productsOrdered[prodIndex].colors === action.payload.colors) {
          state.productsOrdered[prodIndex].quantity += 1;
          return;
        }
      }
      state.productsOrdered?.push(action.payload);
    },
    removeProduct(state, action) {
      state.productsOrdered = state.productsOrdered?.filter((prod) => {
        if (prod.id !== action.payload.id) {
          return true;
        }
        return prod.colors !== action.payload.colors;
      });
    },
    updateQuantity(state, action) {
      state.productsOrdered?.find((prod) => {
        if (action.payload.quantity === 0) {
          state.productsOrdered = state.productsOrdered?.filter(
            (prod) =>
              prod.id === action.payload.id &&
              prod.colors === action.payload.colors
          );
          return;
        }
        if (
          prod.id === action.payload.id &&
          prod.colors === action.payload.colors
        ) {
          prod.quantity = action.payload.quantity;
        }
        return (
          prod.id === action.payload.id && prod.colors === action.payload.colors
        );
      });
    },
    cleanShoppingCart(state) {
      state.orderStatus = "idle";
      state.productsOrdered = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitOrderNoTokenAsync.pending, (state) => {
      state.orderStatus = "pending";
    });
    builder.addCase(submitOrderNoTokenAsync.fulfilled, (state, action) => {
      state.orderStatus = "fullfilled";
    });
    builder.addCase(submitOrderNoTokenAsync.rejected, (state, action) => {
      state.orderStatus = "failed";
    });
  },
});

export const loadingState = (state: RootState) => state.product.status;

export const totalOrdered = (state: RootState) => {
  let total = 0;
  state.shoppingCart.productsOrdered?.forEach((element) => {
    if (element.quantity) {
      total += element.quantity;
    }
  });
  return total;
};

export const totalPrice = (state: RootState): number => {
  let totalPrice = 0;
  if (
    !state.shoppingCart.productsOrdered ||
    state.shoppingCart.productsOrdered.length === 0
  ) {
    return totalPrice;
  }
  state.shoppingCart.productsOrdered.forEach((prod) => {
    totalPrice += prod.price ? prod.price * prod.quantity : 0;
  });
  return totalPrice;
};

export const {
  getShoppingCart,
  addMoreProduct,
  removeProduct,
  updateQuantity,
  cleanShoppingCart,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
