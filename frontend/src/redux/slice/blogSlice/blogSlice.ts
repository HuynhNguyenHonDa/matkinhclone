import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BlogModal,
  fetchBlog,
  fetchBlogDetail,
} from "../../../api/blogApi/BlogApi";

export interface ContactState {
  blogs?: BlogModal[];
  status: "idle" | "loading" | "fulfilled" | "failed";
  selectedBlog?: BlogModal;
}

const initialState: ContactState = {
  blogs: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchBlogAsync = createAsyncThunk(
  "counter/fetchBlogAsync",
  async () => {
    const response = await fetchBlog();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getBlogDetailAsync = createAsyncThunk(
  "counter/getBlogDetail",
  async (slug: string) => {
    const response = await fetchBlogDetail(slug);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getBlogDetailAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedBlog = action.payload;
      });
  },
});

export default blogSlice.reducer;
