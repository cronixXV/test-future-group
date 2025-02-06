import { useState, useEffect } from "react";

import {
  TextField,
  CircularProgress,
  Stack,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";

import {
  setLoading,
  resetRepo,
  setError,
  setRepo,
} from "../reducers/slices/repoSlice";

import { useDebounce } from "../hooks/useDebounce";
import { fetchRepos } from "../libs/api";

function SearchInput() {
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const debouncedUsername = useDebounce(username, 1000);

  const dispatch = useDispatch();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const fetchData = async () => {
      if (debouncedUsername) {
        setErrorMessage(null);

        timeout = setTimeout(() => {
          setShowLoading(true);
        }, 1000);

        dispatch(resetRepo());
        dispatch(setLoading(true));

        try {
          const repos = await fetchRepos(debouncedUsername);
          dispatch(setLoading(false));
          clearTimeout(timeout);
          setShowLoading(false);

          if (repos.length === 0) {
            setErrorMessage("Пользователь/репозиторий не найден");
          } else {
            dispatch(setError(null));
            dispatch(setRepo(repos));
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          dispatch(setLoading(false));
          clearTimeout(timeout);
          setShowLoading(false);
          setErrorMessage("Ошибка загрузки репозиториев");
        }
      }
    };

    fetchData();

    return () => clearTimeout(timeout);
  }, [debouncedUsername, dispatch]);

  return (
    <Stack
      width={"100%"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      sx={{ margin: "20px" }}
    >
      <Typography variant="h6" mb={2} fontWeight={400}>
        Поиск репозиториев на Github
      </Typography>

      <TextField
        label="Введите имя пользователя"
        variant="outlined"
        size="small"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ник на Github"
        autoFocus
      />

      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ marginTop: "10px" }}
      >
        {showLoading && <CircularProgress />}{" "}
      </Box>

      {errorMessage && (
        <Box sx={{ marginTop: "10px", width: "100%" }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
    </Stack>
  );
}

export default SearchInput;
