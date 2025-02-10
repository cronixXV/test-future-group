import { Box, CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (username) {
      dispatch(fetchRepos({ username, page: 1 }));
    }
  }, [dispatch, username]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (page > 1 && username) {
      dispatch(fetchRepos({ username, page }));
    }
  }, [page, dispatch, username]);

  if (status === "loading" && page === 1) {
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
      {repos.length === 0 && status !== "loading" ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Начните поиск
        </Typography>
      ) : (
        <Grid2 container spacing={2} mt={2}>
          {repos.map((repo) => (
            <Grid2
              size={{ xs: 12, md: 6, lg: 4 }}
              key={repo.id}
              width={"fit-content"}
            >
              <RepoCard {...repo} />
            </Grid2>
          ))}
        </Grid2>
      )}
      {status === "loading" && page > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      )}
      <div ref={loaderRef} style={{ height: "1px" }} />
    </Stack>
  );
}

export default RepoList;
