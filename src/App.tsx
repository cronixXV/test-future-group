import { useState } from "react";
import RepoList from "./components/RepoList";
import SeacrhInput from "./components/SeacrhInput";
import { Container } from "@mui/material";

function App() {
  const [username, setUsername] = useState("");

  const handleSearch = (query: string) => {
    setUsername(query);
  };
  return (
    <Container>
      <SeacrhInput onSearch={handleSearch} />
      <RepoList username={username} />
    </Container>
  );
}

export default App;
