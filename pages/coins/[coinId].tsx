import { useRouter } from "next/router";
import React from "react";
import type { NextPage } from "next";
import getIndividualData from "../../apis/getIndividualData";
import { useEffect, useState } from "react";
import styles from "../../styles/coinId.module.css";
import type IndividualCoin from "../../models/individualCoin";

const CoinDetail: NextPage = () => {
  const router = useRouter();
  const [coin, setCoin] = useState<IndividualCoin>();
  const id = router.query.coinId;

  useEffect(() => {
    if (!id) return;
    getIndividualData(Array.isArray(id) ? id[0] : id).then(
      (res) => {
        setCoin(res);
      }
    );
  }, [id]);
  console.log(coin);
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {coin?.id ? (
          <h2>{coin.name}</h2>
        ) : (
          <div className={styles.spinner}></div>
        )}
      </div>
    </main>
  );
};

export default CoinDetail;
