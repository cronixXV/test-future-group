import { useState, useEffect } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import { SearchInputProps } from "../types/type";

function SeacrhInput({ onSearch }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

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
        size="small"
        label="Введите имя пользователя GitHub"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Stack>
  );
}

export default SeacrhInput;
