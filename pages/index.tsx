import type { NextPage } from "next";
import type CoinType from "../models/coin";
import Head from "next/head";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Ctx from "../store/ctxProvider";
import Coin from "../components/Coin";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import CoinsHeader from "../components/CoinsHeader";
import LoadingWrapper from "../components/LoadingWrapper";
import getCoinsData from "../apis/getCoinsData";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ initialData: CoinType[] }> = (props) => {
  const [coins, setCoins] = useState<CoinType[]>(props.initialData);

  const ctx = useContext(Ctx);

  const getCoins = useCallback((page: string, perPage: string) => {
    getCoinsData(page, perPage).then((res) => {
      setCoins(res);
      ctx.setLoading(false);
    });
  }, []);

  const refreshHandler = function () {
    ctx.setLoading(true);
    getCoins(ctx.page, ctx.perPage);
  };

  useEffect(() => {
    getCoins(ctx.page, ctx.perPage);

    const timer = setInterval(() => {
      getCoins(ctx.page, ctx.perPage);
    }, 60000);

    return () => clearInterval(timer);
  }, [ctx.page, ctx.perPage, getCoins]);

  const coinsJSX = coins
    .filter(
      (coin) => !ctx.showFav || ctx.favorites.includes(coin.id)
    )
    .filter(({ name }) =>
      name.toLowerCase().includes(ctx.searchTerm.toLowerCase())
    )
    .map((coin) => <Coin key={coin.id} coin={coin} />);

  const errorMsg = ctx.showFav
    ? "Set some coins as favourites to display them here!"
    : "No coins found.";

  return (
    <>
      <Head>
        <title>Crypto Tracker</title>
      </Head>
      <main className={styles.main}>
        <Filters />
        <LoadingWrapper>
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
        </LoadingWrapper>
        <div className={styles.grid}>
          <button
            onClick={refreshHandler}
            className={styles["btn-refresh"]}
          >
            Refresh
          </button>
          <Pagination />
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
