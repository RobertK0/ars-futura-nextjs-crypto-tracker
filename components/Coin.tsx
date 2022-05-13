import React from "react";
import styles from "../styles/Coin.module.css";
import type { NextPage } from "next";
import type CoinType from "../models/coin";

const Coin: NextPage<{
  coin: CoinType;
  favorite: Function;
  isFav: boolean;
}> = ({ coin, favorite, isFav }) => {
  const clickHandler = function () {
    favorite(coin.id);
  };

  return (
    <div className={styles.row}>
      <button onClick={clickHandler}>{isFav ? "★" : "✰"}</button>
      <span>{coin.market_cap_rank}</span>
      <div className={styles["name-container"]}>
        <img src={coin.image} alt="" />
        <span>{coin.name} |</span>
        <span className={styles.symbol}>
          {" "}
          {coin.symbol.toUpperCase()}
        </span>
      </div>
      <span>$ {coin.current_price.toFixed(2)}</span>
      <span>{`${coin.price_change_percentage_24h.toFixed(
        2
      )}%`}</span>
      <span>$ {coin.ath.toFixed(2)}</span>
      <span>$ {coin.market_cap.toFixed(2)}</span>
    </div>
  );
};

export default Coin;
