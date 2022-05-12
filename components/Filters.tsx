import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Search.module.css";

const Filters: NextPage<{
  searchTerm: string;
  setSearchTerm: Function;
  toggleShowFav: Function;
}> = (props) => {
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
      <button onClick={favToggleHandler}>Favorites</button>
    </div>
  );
};

export default Filters;
