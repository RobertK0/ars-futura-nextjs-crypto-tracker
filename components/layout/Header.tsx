import React from "react";
import styles from "../../styles/Header.module.css";
import type { NextPage } from "next";

const Header: NextPage = () => {
  return (
    <header className={styles.header}>
      <h1>Crypto Tracker</h1>
    </header>
  );
};

export default Header;
