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
      <span className={styles.center}>Price</span>
      <span className={styles.center}>24h %</span>
      <span className={styles.center}>ATH</span>
      <span className={styles.right}>Market Cap</span>
    </div>
  );
};

export default CoinsHeader;
