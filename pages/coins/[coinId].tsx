import { useRouter } from "next/router";
import React from "react";
import type { NextPage } from "next";
import getIndividualData from "../../apis/getIndividualData";
import { useEffect, useState } from "react";
import styles from "../../styles/coinId.module.css";
import type IndividualCoin from "../../models/individualCoin";
import CoinData from "../../components/CoinDetails";
import Head from "next/head";

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
    <>
      <Head>
        <title>Coin Details</title>
      </Head>
      <main className={styles.main}>
        {coin?.id ? (
          <div className={styles.container}>
            <CoinData coin={coin} />
          </div>
        ) : (
          <div className={styles.spinner}></div>
        )}
      </main>
    </>
  );
};

export default CoinDetail;
