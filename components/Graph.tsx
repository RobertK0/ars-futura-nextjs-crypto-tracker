import React, { useEffect, useRef } from "react";
import styles from "../styles/Graph.module.css";
import type { NextPage } from "next";
import Chart from "chart.js/auto";
import getChartConfig from "../config/getChartConfig";

const Graph: NextPage<{ data: number[] }> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (!context) return;

    Chart.defaults.font.family = "Montserrat";
    Chart.defaults.color = "#fff";
    const myChart = new Chart(context, getChartConfig(data));

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas
        className={styles["coin-chart"]}
        id="coin-chart"
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default Graph;
