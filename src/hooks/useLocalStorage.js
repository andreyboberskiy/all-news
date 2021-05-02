import { useCallback } from "react";

export const useLocalStorage = () => {
  const setItem = useCallback((itemName, value) => {
    localStorage.setItem(itemName, JSON.stringify(value));
  }, []);

  const getItem = useCallback((itemName) => {
    const item = JSON.parse(localStorage.getItem(itemName));
    return item;
  }, []);

  return { setItem, getItem };
};
