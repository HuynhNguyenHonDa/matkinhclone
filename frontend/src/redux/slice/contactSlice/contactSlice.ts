import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactModel, fetchContact } from "../../../api/contactApi/contactApi";
import { RootState, AppThunk } from "../../store";

export interface ContactState {
  contact?: ContactModel;
  status: "idle" | "loading" | "fulfilled" | "failed";
}

const initialState: ContactState = {
  contact: undefined,
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchContactAsync = createAsyncThunk(
  "counter/fetchContact",
  async () => {
    const response = await fetchContact();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.contact = action.payload;
      })
      .addCase(fetchContactAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});


export const contact = (state: RootState) => state.contact.contact;


export default contactSlice.reducer;
