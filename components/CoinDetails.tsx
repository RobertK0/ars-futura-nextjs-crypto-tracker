import type { NextPage } from "next";
import type IndividualCoin from "../models/individualCoin";
import Graph from "./Graph";
import styles from "../styles/CoinDetails.module.css";

function addSuffix(i: number) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

function generateStyles(input: number) {
  return input > 0 ? styles.pos : styles.neg;
}

const CoinDetails: NextPage<{ coin: IndividualCoin }> = ({
  coin,
}) => {
  const formatCur = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  });

  const rank = addSuffix(coin.market_data.market_cap_rank);

  return (
    <div className={styles.grid}>
      <div className={styles["name-container"]}>
        <img src={coin.image.thumb} alt="" />
        <h2>
          {coin.name} ({coin.symbol.toUpperCase()})
        </h2>
      </div>

      <div className={styles["price-container"]}>
        <span>
          ${formatCur.format(coin.market_data.current_price.usd)}
        </span>
        <span>
          {coin.market_data.current_price.btc.toFixed(8)} BTC
        </span>
      </div>
      <div className={styles["mcap-container"]}>
        <h3>Market Cap</h3>
        <span>
          ${formatCur.format(coin.market_data.market_cap.usd)} (
          {rank})
        </span>
      </div>
      <div className={styles["volume-container"]}>
        <h3>Total Volume</h3>
        <span>
          ${formatCur.format(coin.market_data.total_volume.usd)}
        </span>
      </div>

      <div className={styles["change-container"]}>
        <span>24h</span>

        <span
          className={generateStyles(
            coin.market_data.price_change_percentage_24h
          )}
        >
          {coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
      <div className={styles["change-container"]}>
        <span>7d</span>

        <span
          className={generateStyles(
            coin.market_data.price_change_percentage_7d
          )}
        >
          {coin.market_data.price_change_percentage_7d.toFixed(2)}%
        </span>
      </div>
      <div className={styles["change-container"]}>
        <span>14d</span>

        <span
          className={generateStyles(
            coin.market_data.price_change_percentage_14d
          )}
        >
          {coin.market_data.price_change_percentage_14d.toFixed(2)}%
        </span>
      </div>
      <Graph data={coin.market_data.sparkline_7d.price} />
    </div>
  );
};

export default CoinDetails;
