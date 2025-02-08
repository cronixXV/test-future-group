import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserRepos } from "../../libs/api";
import { Repo, RepoState } from "../../types/type";

const initialState: RepoState = {
  repos: [],
  status: "idle",
  error: null,
};

export const fetchRepos = createAsyncThunk<
  Repo[],
  { username: string; page: number }
>("repos/fetchRepos", async ({ username, page }, { rejectWithValue }) => {
  try {
    const data = await fetchUserRepos(username, page);
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
});

const repoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    clearRepos: (state) => {
      state.repos = [];
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<Repo[]>) => {
        state.status = "succeeded";
        state.repos = [...state.repos, ...action.payload];
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearRepos } = repoSlice.actions;
export default repoSlice.reducer;
