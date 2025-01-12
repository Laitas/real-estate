import { useAppwrite } from "@/hooks/useAppwrite";
import { createContext, useContext, type ReactNode } from "react";
import { getUser } from "./appwrite";

type User = {
  $id: string;
  name: string;
  email: string;
  avatar: string;
};

type GlobalContext = {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
};

const GlobalContext = createContext<GlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, loading, refetch } = useAppwrite({ fn: getUser });

  const isLoggedIn = !!user;

  console.log("user", user);

  return (
    <GlobalContext.Provider value={{ user, isLoggedIn, refetch, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
