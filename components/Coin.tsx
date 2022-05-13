import React from "react";
import styles from "../styles/Coin.module.css";
import type { NextPage } from "next";
import type CoinType from "../models/coin";
import Link from "next/link";

const Coin: NextPage<{
  coin: CoinType;
  favorite: Function;
  isFav: boolean;
}> = ({ coin, favorite, isFav }) => {
  const clickHandler = function (event: React.MouseEvent) {
    favorite(coin.id);
    event.stopPropagation();
  };

  const styles24h =
    coin.price_change_percentage_24h > 0 ? styles.pos : styles.neg;

  return (
    <Link href={`/coins/${coin.id}`}>
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
        <span
          className={styles24h}
        >{`${coin.price_change_percentage_24h.toFixed(2)}%`}</span>
        <span>$ {coin.ath.toFixed(2)}</span>
        <span>$ {coin.market_cap.toFixed(2)}</span>
      </div>
    </Link>
  );
};

export default Coin;
