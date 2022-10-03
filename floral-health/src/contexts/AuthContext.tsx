import { User } from "firebase/auth";
import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  getFloralNames: (value: readonly string[]) => void;
  floralName: readonly string[];
  getUser: (value: User) => void;
  user: User | undefined;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [floralName, setFloralName] = useState<readonly string[]>([])

  const getFloralNames = (value: readonly string[]) => {
    setFloralName(value);
  };

  const getUser = (values: User) => {
    setUser(values);
  };
  
  return (
    <AuthContext.Provider value={{getFloralNames, floralName, user, getUser}}>
      {props.children}
    </AuthContext.Provider>
  );
}