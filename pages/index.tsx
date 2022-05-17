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

const Home: NextPage<{ initialData: CoinType[] }> = (props) => {
  const [coins, setCoins] = useState<CoinType[]>(props.initialData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFav, setShowFav] = useState<Boolean>(false);
  const [page, setPage] = useState<string>("1");
  const [perPage, setPerPage] = useState<string>("10");
  const [loading, setLoading] = useState<Boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavoriteHandler = function (id: string) {
    setFavorites((prevState) => {
      if (!prevState.includes(id)) {
        const newFavs = [...prevState, id];
        if (typeof window !== "undefined")
          localStorage.setItem(
            "favourites",
            JSON.stringify(newFavs)
          );
        return newFavs;
      } else {
        const newFavs = [...prevState].filter(
          (coin) => coin !== id
        );
        if (typeof window !== "undefined")
          localStorage.setItem(
            "favourites",
            JSON.stringify(newFavs)
          );
        return newFavs;
      }
    });
  };

  const toggleShowFav = function () {
    setPage("1");
    setPerPage((prevState) => {
      setLoading(true);
      if (prevState !== "250") {
        return "250";
      } else return "10";
    });
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

  const refreshHandler = function () {
    setLoading(true);
    getCoinsData(page, perPage).then((res) => {
      setCoins(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    setFavorites(
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("favourites") || "[]")) ||
        []
    );
  }, []);

  useEffect(() => {
    getCoinsData(page, perPage).then((res) => {
      setCoins(res);
      setLoading(false);
    });

    const timer = setInterval(() => {
      getCoinsData(page, perPage).then((res) => {
        setCoins(res);
        setLoading(false);
      });
    }, 60000);

    return () => clearInterval(timer);
  }, [page, perPage]);

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
