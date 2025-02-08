import { Box, CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../reducers/slices/repoSlice";
import RepoCard from "./RepoCard";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { RepoListProps } from "../types/type";

function RepoList({ username }: RepoListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, status, error } = useSelector(
    (state: RootState) => state.repos
  );

  useEffect(() => {
    if (username) {
      dispatch(
        fetchRepos({
          username,
          page: 1,
        })
      );
    }
  }, [dispatch, username]);

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Typography variant="h6" color="error">
          Ошибка: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      p={"0 15px"}
    >
      {repos.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Нет репозиториев для данного пользователя.
        </Typography>
      ) : (
        <Grid2 container spacing={2} mt={2}>
          {repos.map((repo) => (
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }} key={repo.id}>
              <RepoCard {...repo} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Stack>
  );
}

export default RepoList;
