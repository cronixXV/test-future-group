import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repo, RepoState } from "../../types/type";

const initialState: RepoState = {
  repos: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepo: (state, action: PayloadAction<Repo[]>) => {
      state.repos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    resetRepo: (state) => {
      state.repos = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
});

export const { setRepo, setLoading, setError, setPage, setHasMore, resetRepo } =
  repoSlice.actions;

export default repoSlice.reducer;
