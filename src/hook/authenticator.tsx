import React, { createContext, useCallback, useState, useContext } from "react";

import api_auth from "../http/api-auth";
import api from "../http/api";

interface User {
  nome: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@app:token");
    const user = localStorage.getItem("@app:user");

    if (token && user) {
      api_auth.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ username, password }: any) => {
    const response = await api.post("/Authentication/login", {
      username,
      password,
    });

    const { token } = response.data;

    const user = { username, token };

    localStorage.setItem("@app:token", token);
    localStorage.setItem("@app:user", JSON.stringify(user));

    api_auth.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@app:token");
    localStorage.removeItem("@app:user");

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
