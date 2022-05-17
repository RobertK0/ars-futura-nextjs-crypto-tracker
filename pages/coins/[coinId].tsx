import { useRouter } from "next/router";
import React from "react";
import type { NextPage } from "next";
import getIndividualData from "../../apis/getIndividualData";
import { useEffect, useState } from "react";
import styles from "../../styles/coinId.module.css";
import type IndividualCoin from "../../models/individualCoin";
import CoinDetails from "../../components/CoinDetails";
import Head from "next/head";

const CoinDetail: NextPage = () => {
  const router = useRouter();
  const [coin, setCoin] = useState<IndividualCoin>();
  const id = router.query.coinId;
  const pageTitle = router.query.coinId
    ? router.query.coinId[0].toUpperCase() +
      router.query.coinId.slice(1)
    : "";

  useEffect(() => {
    if (!id) return;
    getIndividualData(Array.isArray(id) ? id[0] : id).then(
      (res) => {
        setCoin(res);
      }
    );
  }, [id]);

  const backHandler = function () {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{pageTitle} | Coin Details</title>
      </Head>

      <main className={styles.main}>
        <button
          onClick={backHandler}
          className={styles["btn-back"]}
        >
          {"< Back"}
        </button>
        {coin?.id ? (
          <div className={styles.container}>
            <CoinDetails coin={coin} />
          </div>
        ) : (
          <div className={styles.spinner}></div>
        )}
      </main>
    </>
  );
};

export default CoinDetail;
