import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Search.module.css";

const Filters: NextPage<{
  searchTerm: string;
  setSearchTerm: Function;
}> = (props) => {
  const searchHandler = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    props.setSearchTerm(e.target.value);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search"
        value={props.searchTerm}
        onChange={searchHandler}
      />
      <button>Favorites</button>
    </div>
  );
};

export default Filters;
