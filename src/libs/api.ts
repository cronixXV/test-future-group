import { Repo } from "../types/type";

export const fetchUserRepos = async (
  username: string,
  page: number = 1,
  perPage: number = 20
): Promise<Repo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("Пользователь не найден");
      if (response.status === 403)
        throw new Error("Превышен лимит запросов к API GitHub");
      throw new Error("Ошибка загрузки данных");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Произошла неизвестная ошибка. Повторите попытку позже"
    );
  }
};
