import { createContext, useContext } from "react";

export const AppContext = createContext(null);

export function useAppData() {
  const value = useContext(AppContext);
  if (value === null) {
    throw new Error("useAppData must be used inside AppProvider");
  }
  return value;
}
