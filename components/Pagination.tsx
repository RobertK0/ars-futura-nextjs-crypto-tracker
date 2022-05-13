import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Pagination.module.css";

type PropsType = {
  switchPage: Function;
  page: string;
};

const Pagination: NextPage<PropsType> = (props) => {
  const clickHandler = function (next: Boolean) {
    props.switchPage(next);
  };

  return (
    <div className={styles.container}>
      <button onClick={clickHandler.bind(null, false)}>
        {"<<<"}
      </button>
      <span>{props.page}</span>
      <button onClick={clickHandler.bind(null, true)}>
        {">>>"}
      </button>
    </div>
  );
};

export default Pagination;
