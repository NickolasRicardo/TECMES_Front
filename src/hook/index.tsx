import React from "react";
import { AuthProvider } from "./authenticator";

const AppProvider = ({ children }: any) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
