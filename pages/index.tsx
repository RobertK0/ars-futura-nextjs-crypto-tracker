import type { NextPage } from "next";
import getCoinsData from "../apis/getCoinsData";
import styles from "../styles/Home.module.css";
import Coin from "../components/Coin";
import { useCallback, useEffect, useState } from "react";
import Filters from "../components/Filters";
import type CoinType from "../models/coin";
import Pagination from "../components/Pagination";
import CoinsHeader from "../components/CoinsHeader";
import Head from "next/head";

const Home: NextPage<{ initialData: CoinType[] }> = (props) => {
  const [coins, setCoins] = useState<CoinType[]>(props.initialData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFav, setShowFav] = useState<Boolean>(false);
  const [page, setPage] = useState<string>("1");
  const [perPage, setPerPage] = useState<string>("10");
  const [loading, setLoading] = useState<Boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const getCoins = useCallback((page: string, perPage: string) => {
    getCoinsData(page, perPage).then((res) => {
      setCoins(res);
      setLoading(false);
    });
  }, []);

  const toggleFavoriteHandler = function (id: string) {
    setFavorites((prevState) => {
      const persistData = function (data: string[]) {
        if (typeof window !== "undefined")
          localStorage.setItem("favourites", JSON.stringify(data));
        return data;
      };

      return persistData(
        !prevState.includes(id)
          ? [...prevState, id]
          : [...prevState].filter((coin) => coin !== id)
      );
    });
  };

  const toggleShowFav = function () {
    setLoading(true);
    setPage("1");
    setPerPage((prevState) => (prevState !== "250" ? "250" : "10"));
    setShowFav((prevState) => !prevState);
  };

  const switchPageHandler = function (next: Boolean) {
    setPage((curPage) =>
      !next
        ? curPage !== "1"
          ? `${+curPage - 1}`
          : "1"
        : `${+curPage + 1}`
    );
  };

  const refreshHandler = function () {
    setLoading(true);
    getCoins(page, perPage);
  };

  useEffect(() => {
    setFavorites(
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("favourites") || "[]")) ||
        []
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    getCoins(page, perPage);

    const timer = setInterval(() => {
      getCoins(page, perPage);
    }, 60000);

    return () => clearInterval(timer);
  }, [page, perPage, getCoins]);

  const coinsJSX = coins
    .filter((coin) => !showFav || favorites.includes(coin.id))
    .filter(({ name }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((coin) => (
      <Coin
        isFav={favorites.includes(coin.id) ? true : false}
        key={coin.id}
        favorite={toggleFavoriteHandler}
        coin={coin}
      />
    ));

  const errorMsg = showFav
    ? "Set some coins as favourites to display them here!"
    : "No coins found.";

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
            {coinsJSX.length === 0 ? (
              <span className={styles["error-msg"]}>
                {errorMsg}
              </span>
            ) : (
              coinsJSX
            )}
          </div>
        )}
        <div className={styles.grid}>
          <button
            onClick={refreshHandler}
            className={styles["btn-refresh"]}
          >
            Refresh
          </button>
          {showFav ? null : (
            <Pagination
              page={page}
              switchPage={switchPageHandler}
            />
          )}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const data = await getCoinsData("1", "10");

  return {
    props: {
      initialData: data,
    },
  };
}

export default Home;
