import { Repo } from "../types/type";

const API_URL = "https://api.github.com/users/";

export const fetchRepos = async (username: string): Promise<Repo[]> => {
  try {
    const response = await fetch(`${API_URL}${username}/repos`);

    if (!response.ok) {
      throw new Error("Пользователь не найден");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
