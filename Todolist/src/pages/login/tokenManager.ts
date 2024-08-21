const TOKEN_KEY = 'authToken';

export const setToken = (newToken: string) => {
  localStorage.setItem(TOKEN_KEY, newToken);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};