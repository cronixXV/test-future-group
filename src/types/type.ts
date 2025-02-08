export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
}

export interface RepoState {
  repos: Repo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface SearchInputProps {
  onSearch: (query: string) => void;
}

export interface RepoCardProps {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

export interface RepoListProps {
  username: string;
}
