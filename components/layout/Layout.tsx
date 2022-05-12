import React from "react";
import Header from "./Header";
import type { NextPage } from "next";

const Layout: NextPage<{ children: React.ReactNode }> = (props) => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
