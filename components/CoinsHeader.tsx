import React from "react";
import styles from "../styles/CoinsHeader.module.css";
import type { NextPage } from "next";

const CoinsHeader: NextPage = () => {
  return (
    <div className={styles.header}>
      <span>*</span>
      <span>#</span>
      <div className={styles["name-container"]}>
        <span className={styles.symbol}>Name</span>
      </div>
      <span>Price</span>
      <span>24h %</span>
      <span>ATH</span>
      <span>Market Cap</span>
    </div>
  );
};

export default CoinsHeader;
