import React from "react";
import { useStorageState } from "../utils/use-storage-state";
import type { AuthContextType, LoginProps } from "../types/IAuth";
import { handleLogin } from "../scripts/auth";

const AuthContext = React.createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  user: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ login, password }: LoginProps) => {
          const sessionUser = await handleLogin({ login, password });

          if (sessionUser) {
            setSession(JSON.stringify(sessionUser));
          } else {
            throw new Error("Error Login");
          }
        },
        signOut: () => {
          setSession(null);
        },
        user: () => {
          return session ? JSON.parse(session) : null;
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}