import axios from "axios";

const TOKEN_KEY = "authToken";

export const setToken = (newToken: string) => {
  localStorage.setItem(TOKEN_KEY, newToken);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const ID_KEY = "idToken";

export const setUserId = (newUserId: string) => {
  localStorage.setItem(ID_KEY, newUserId);
};

export const getUserID = (): string | null => {
  return localStorage.getItem(ID_KEY);
};

const USER_NAME = "username";

export const setUserName = (newUserName: string) => {
  localStorage.setItem(USER_NAME, newUserName);
};

export const getUserName = (): string | null => {
  return localStorage.getItem(USER_NAME);
};

const PHRASE = "phrase";

export const getPhrase = (): string | null => {
  return localStorage.getItem(PHRASE);
};

export const setPhrase = async (): Promise<void> => {
  const res = await axios.get("https://api.adviceslip.com/advice")
    const advice = res.data.slip.advice;
    localStorage.setItem(PHRASE, advice);
  
};
