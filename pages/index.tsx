import type { NextPage } from "next";
import getCoinsData from "../apis/getCoinsData";
import styles from "../styles/Home.module.css";
import Coin from "../components/Coin";
import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import type CoinType from "../models/coin";

const Home: NextPage = () => {
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavoriteHandler = function (id: string) {
    setFavorites((prevState) => {
      if (!prevState.includes(id)) return [...prevState, id];
      else return [...prevState].filter((coin) => coin !== id);
    });
  };

  useEffect(() => {
    getCoinsData().then((res) => setCoins(res));
  }, []);

  let filteredCoins: CoinType[] = coins;

  const coinsJSX = filteredCoins
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
      <Filters
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <div className={styles.container}>{coinsJSX}</div>
    </>
  );
};

export default Home;
