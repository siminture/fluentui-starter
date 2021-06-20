import React from "react";
import { useAuthentication } from "global/authentication";
import { MasterLayout } from "./MasterLayout";
import { BlankLayout } from "./BlankLayout";

export function AutoSwitchLayout({ children }) {
  const { isAuthenticated } = useAuthentication();
  const Layout = isAuthenticated ? MasterLayout : BlankLayout;

  return <Layout>{children}</Layout>;
}
