import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Filters.module.css";

type PropsType = {
  searchTerm: string;
  setSearchTerm: Function;
  showFav: Boolean;
  toggleShowFav: Function;
};

const Filters: NextPage<PropsType> = (props) => {
  const searchHandler = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    props.setSearchTerm(e.target.value);
  };

  const favToggleHandler = function () {
    props.toggleShowFav();
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search"
        value={props.searchTerm}
        onChange={searchHandler}
      />
      <button
        className={props.showFav ? styles.shown : ""}
        onClick={favToggleHandler}
      >
        {props.showFav ? "Hide" : "Show"} favourites
      </button>
    </div>
  );
};

export default Filters;
