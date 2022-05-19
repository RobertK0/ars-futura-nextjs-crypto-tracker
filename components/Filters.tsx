import type { NextPage } from "next";
import { useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/Filters.module.css";

const Filters: NextPage = () => {
  const ctx = useContext(Ctx);

  const searchHandler = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    ctx.setSearchTerm(e.target.value);
  };

  const favToggleHandler = function () {
    ctx.toggleShowFav();
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search"
        value={ctx.searchTerm}
        onChange={searchHandler}
      />
      <button
        className={ctx.showFav ? styles.shown : ""}
        onClick={favToggleHandler}
      >
        {ctx.showFav ? "Hide" : "Show"} favourites
      </button>
    </div>
  );
};

export default Filters;
