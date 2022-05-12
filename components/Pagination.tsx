import React from "react";
import type { NextPage } from "next";

const Pagination: NextPage<{ switchPage: Function }> = (props) => {
  const clickHandler = function (next: Boolean) {
    props.switchPage(next);
  };

  return (
    <div>
      <button onClick={clickHandler.bind(null, false)}>
        {"<<<"}
      </button>
      <button onClick={clickHandler.bind(null, true)}>
        {">>>"}
      </button>
    </div>
  );
};

export default Pagination;
