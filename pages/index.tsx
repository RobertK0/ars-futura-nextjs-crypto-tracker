import type { NextPage } from "next";
import getCoinsData from "../apis/getCoinsData";
import styles from "../styles/Home.module.css";
import Coin from "../components/Coin";
import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import type CoinType from "../models/coin";
import Pagination from "../components/Pagination";

const Home: NextPage = () => {
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFav, setShowFav] = useState<Boolean>(false);
  const [page, setPage] = useState<string>("1");

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
        if (prevPage !== "1") return (+prevPage - 1).toString();
        else return "1";
      });
    } else {
      setPage((prevPage) => {
        return (+prevPage + 1).toString();
      });
    }
  };

  useEffect(() => {
    getCoinsData(page).then((res) => setCoins(res));
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
    <main className={styles.main}>
      <Filters
        showFav={showFav}
        toggleShowFav={toggleShowFav}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <div className={styles.container}>{coinsJSX}</div>
      <Pagination page={page} switchPage={switchPageHandler} />
    </main>
  );
};

export default Home;
