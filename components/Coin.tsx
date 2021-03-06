import type { NextPage } from "next";
import type CoinType from "../models/coin";
import Link from "next/link";
import { useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/Coin.module.css";

const Coin: NextPage<{ coin: CoinType }> = ({ coin }) => {
  const ctx = useContext(Ctx);

  const clickHandler = function (event: React.MouseEvent) {
    ctx.setFavorites(coin.id);
    event.stopPropagation();
  };

  const styles24h =
    coin.price_change_percentage_24h > 0 ? styles.pos : styles.neg;

  const formatCur = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format;

  const isFav = ctx.favorites.includes(coin.id) ? "★" : "✰";

  return (
    <Link href={`/coins/${coin.id}`}>
      <div className={styles.row}>
        <button
          className={styles["btn-favourite"]}
          onClick={clickHandler}
        >
          {isFav}
        </button>
        <span className={styles["mcap-rank"]}>
          {coin.market_cap_rank}
        </span>
        <div className={styles["name-container"]}>
          <img className={styles.image} src={coin.image} alt="" />
          <span>{coin.name} |</span>
          <span className={styles.symbol}>
            {" "}
            {coin.symbol.toUpperCase()}
          </span>
        </div>
        <span className={styles["cur-price"]}>
          ${formatCur(coin.current_price)}
        </span>
        <span
          className={`${styles24h} ${styles.center}`}
        >{`${coin.price_change_percentage_24h?.toFixed(2)}%`}</span>
        <span className={styles.ath}>${formatCur(coin.ath)}</span>
        <span className={styles.mcap}>
          ${formatCur(coin.market_cap)}
        </span>
      </div>
    </Link>
  );
};

export default Coin;
