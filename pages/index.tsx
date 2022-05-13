import type { NextPage } from "next";
import getCoinsData from "../apis/getCoinsData";
import styles from "../styles/Home.module.css";
import Coin from "../components/Coin";
import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import type CoinType from "../models/coin";
import Pagination from "../components/Pagination";
import CoinsHeader from "../components/CoinsHeader";
import Head from "next/head";

const Home: NextPage = () => {
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFav, setShowFav] = useState<Boolean>(false);
  const [page, setPage] = useState<string>("1");
  const [loading, setLoading] = useState<Boolean>(true);

  const toggleFavoriteHandler = function (id: string) {
    setFavorites((prevState) => {
      if (!prevState.includes(id)) return [...prevState, id];
      else return [...prevState].filter((coin) => coin !== id);
    });
  };

  const toggleShowFav = function () {
    setShowFav((prevState) => !prevState);
  };

  const switchPageHandler = function (next: Boolean) {
    if (!next) {
      setPage((prevPage) => {
        if (prevPage !== "1") {
          setLoading(true);
          return (+prevPage - 1).toString();
        } else return "1";
      });
    } else {
      setPage((prevPage) => {
        setLoading(true);
        return (+prevPage + 1).toString();
      });
    }
  };

  useEffect(() => {
    getCoinsData(page).then((res) => {
      setCoins(res);
      setLoading(false);
    });
  }, [page]);

  let filteredCoins: CoinType[] = coins;

  const coinsJSX = filteredCoins
    .filter((coin) => {
      if (!showFav) return true;
      return favorites.includes(coin.id);
    })
    .filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((coin) => {
      return (
        <Coin
          isFav={favorites.includes(coin.id) ? true : false}
          key={coin.id}
          favorite={toggleFavoriteHandler}
          coin={coin}
        />
      );
    });

  return (
    <>
      <Head>
        <title>Crypto Tracker</title>
      </Head>
      <main className={styles.main}>
        <Filters
          showFav={showFav}
          toggleShowFav={toggleShowFav}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />

        {loading ? (
          <div className={styles.spinner}></div>
        ) : (
          <div className={styles.container}>
            <CoinsHeader />
            {coinsJSX.length === 0
              ? "Set some coins as favourites to display them here!"
              : coinsJSX}
          </div>
        )}
        <Pagination page={page} switchPage={switchPageHandler} />
      </main>
    </>
  );
};

export default Home;
