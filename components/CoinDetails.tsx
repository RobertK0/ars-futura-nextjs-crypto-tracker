import type { NextPage } from "next";
import React from "react";
import styles from "../styles/CoinDetails.module.css";
import type IndividualCoin from "../models/individualCoin";

const CoinData: NextPage<{ coin: IndividualCoin }> = ({ coin }) => {
  return (
    <div className={styles.grid}>
      <h2>
        {coin.name} ({coin.symbol})
      </h2>
      <h3>Market Cap</h3>
      <h3>Total Volume</h3>
      <div className={styles["price-container"]}>
        <span>${coin.market_data.current_price.usd}</span>
        <br />
        <span>{coin.market_data.current_price.btc} BTC</span>
      </div>
      <span>
        ${coin.market_data.market_cap.usd} (
        {coin.market_data.market_cap_rank}th)
      </span>
      <span>${coin.market_data.total_volume.usd}</span>
      <div className={styles["change-container"]}>
        <span>24h</span>
        <br />
        <span className={styles.change}>
          {coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
      <div className={styles["change-container"]}>
        <span>7d</span>
        <br />
        <span className={styles.change}>
          {coin.market_data.price_change_percentage_7d.toFixed(2)}%
        </span>
      </div>
      <div className={styles["change-container"]}>
        <span>14d</span>
        <br />
        <span className={styles.change}>
          {coin.market_data.price_change_percentage_14d.toFixed(2)}%
        </span>
      </div>
      <div className={styles["graph-container"]}>asdf</div>
    </div>
  );
};

export default CoinData;
