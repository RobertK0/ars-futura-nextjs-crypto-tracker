import React from "react";
import styles from "../styles/Coin.module.css";
import type { NextPage } from "next";
import type CoinType from "../models/coin";
import Link from "next/link";

type PropsType = {
  coin: CoinType;
  favorite: Function;
  isFav: boolean;
};

const Coin: NextPage<PropsType> = ({ coin, favorite, isFav }) => {
  const clickHandler = function (event: React.MouseEvent) {
    favorite(coin.id);
    event.stopPropagation();
  };

  const styles24h =
    coin.price_change_percentage_24h > 0 ? styles.pos : styles.neg;

  const formatCur = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  });

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
        <span className={styles.center}>
          $ {formatCur.format(coin.current_price)}
        </span>
        <span
          className={`${styles24h} ${styles.center}`}
        >{`${coin.price_change_percentage_24h.toFixed(2)}%`}</span>
        <span className={styles.center}>
          $ {formatCur.format(coin.ath)}
        </span>
        <span className={styles.right}>
          $ {formatCur.format(coin.market_cap)}
        </span>
      </div>
    </Link>
  );
};

export default Coin;
