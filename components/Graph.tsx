import React from "react";
import styles from "../styles/Graph.module.css";
import type { NextPage } from "next";

const Graph: NextPage<{ data: number[] }> = ({ data }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  const jsx = data.map((value, index) => {
    const prevPerc =
      ((data[index - 1] - minValue) / (maxValue - minValue)) * 100;
    const percentage =
      ((value - minValue) / (maxValue - minValue)) * 100;

    return (
      <div key={index} className={styles["point-container"]}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1={-prevPerc + 100}
            x2="100"
            y2={-percentage + 100}
            stroke="white"
            strokeWidth="2px"
          />
        </svg>
      </div>
    );
  });

  return <div className={styles.container}>{jsx}</div>;
};

export default Graph;
