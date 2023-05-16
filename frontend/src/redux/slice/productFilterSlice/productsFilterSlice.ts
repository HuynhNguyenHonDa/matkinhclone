import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchFormFace,
  fetchGenders,
  fetchGlassesMaterial,
  fetchGlassesShape,
  fetchProductFilter,
  ProductFilterCommand,
} from "../../../api/productFilterApi/productFilterApi";
import { FormFaceModal } from "../../../models/formface";
import { GendersModal } from "../../../models/genders";
import { GlassesMaterialModal } from "../../../models/glassesMaterial";
import { GlassesShapeModal } from "../../../models/glassesShape";
import { ProductFilterModel } from "../../../models/productFilter";
import { RootState } from "../../store";

export interface ProductFilterState {
  genders: GendersModal[];
  formface: FormFaceModal[];
  glassShape: GlassesShapeModal[];
  glassMaterial: GlassesMaterialModal[];
  status: "idle" | "loading" | "failed";
  selectedFilter: ProductFilterModel;
}

const initialState: ProductFilterState = {
  genders: [],
  formface: [],
  glassShape: [],
  glassMaterial: [],
  status: "idle",
  selectedFilter: {},
};
export const fetchGlassShapeAsync = createAsyncThunk(
  "productsFilter/fetchGlassShape",
  async () => {
    const response = await fetchGlassesShape();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetchGenderAsync = createAsyncThunk(
  "productsFilter/fetchGender",
  async () => {
    const response = await fetchGenders();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchFormFaceAsync = createAsyncThunk(
  "productsFilter/fetchFormFace",
  async (genderId: number | undefined) => {
    const response = await fetchFormFace(genderId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchGlassesMaterialAsync = createAsyncThunk(
  "productsFilter/fetchGlassesMaterial",
  async () => {
    const response = await fetchGlassesMaterial();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchProductFilterAsync = createAsyncThunk(
  "productsFilter/fetchProductFilter",
  async (productFilter: ProductFilterCommand) => {
    const response = await fetchProductFilter(productFilter);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const productsFilterSlice = createSlice({
  name: "productsFilter",
  initialState,
  reducers: {
    addGenderFilter(state, action) {
      state.selectedFilter.gender = action.payload;
    },
    addFormFaceFilter(state, action) {
      if (state.selectedFilter.formface) {
        state.selectedFilter.formface = [
          ...state.selectedFilter.formface,
          action.payload,
        ];
        return;
      }
      state.selectedFilter.formface = [action.payload];
    },
    removeFormFaceFilter(state, action) {
      state.selectedFilter.formface = state.selectedFilter.formface?.filter(
        (form) => form.id !== action.payload.id
      );
    },
    addGlassShapeFilter(state, action) {
      if (state.selectedFilter.glassesShape) {
        state.selectedFilter.glassesShape = [
          ...state.selectedFilter.glassesShape,
          action.payload,
        ];
        return;
      }
      state.selectedFilter.glassesShape = [action.payload];
    },
    removeGlassShapeFilter(state, action) {
      state.selectedFilter.glassesShape =
        state.selectedFilter.glassesShape?.filter(
          (form) => form.id !== action.payload.id
        );
    },
    addGlassMaterialFilter(state, action) {
      if (state.selectedFilter.glassesMaterial) {
        state.selectedFilter.glassesMaterial = [
          ...state.selectedFilter.glassesMaterial,
          action.payload,
        ];
        return;
      }
      state.selectedFilter.glassesMaterial = [action.payload];
    },
    removeGlassMaterialFilter(state, action) {
      state.selectedFilter.glassesMaterial =
        state.selectedFilter.glassesMaterial?.filter(
          (form) => form.id !== action.payload.id
        );
    },
    clearFilterList(state) {
      state.selectedFilter.formface = [];
      state.selectedFilter.gender = undefined;
      state.selectedFilter.glassesMaterial = [];
      state.selectedFilter.glassesShape = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGenderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.genders = action.payload;
      })
      .addCase(fetchGenderAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchFormFaceAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.formface = action.payload;
      })
      .addCase(fetchGlassShapeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.glassShape = action.payload;
      })
      .addCase(fetchGlassesMaterialAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.glassMaterial = action.payload;
      });
  },
});

export const {
  clearFilterList,
  addGenderFilter,
  addFormFaceFilter,
  removeFormFaceFilter,
  addGlassShapeFilter,
  removeGlassShapeFilter,
  addGlassMaterialFilter,
  removeGlassMaterialFilter,
} = productsFilterSlice.actions;

export default productsFilterSlice.reducer;
