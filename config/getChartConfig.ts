import type { ChartConfiguration } from "chart.js";

const formatLabel = function (val: string) {
  const arr = val.split("/");
  return `${arr[0]}.${arr[1]}.`;
};

const getChartConfig = function (data: number[]) {
  const labels = data.map((_, index) => {
    const timePoint = new Date(
      Date.now() -
        (Date.now() % 3_600_000) -
        604_800_000 +
        index * 3_600_000
    ).toLocaleString("en-GB", {
      timeZone: "GMT",
    });
    return timePoint;
  });

  const chartConfig: ChartConfiguration = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: undefined,
          data: data,
          borderWidth: 1,
          borderColor: "#5bc0be",
          hoverBackgroundColor: "#5bc0be",
          hoverRadius: 5,
          pointBorderColor: "transparent",
          backgroundColor: "transparent",
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: { color: "transparent" },
          ticks: {
            autoSkip: true,
            autoSkipPadding: 5,
            maxTicksLimit: 168,
            maxRotation: 0,
            callback: function (val, index, ticks) {
              return formatLabel(
                this.getLabelForValue(ticks[index].value)
              ) !==
                formatLabel(
                  this.getLabelForValue(
                    ticks[index - 1]?.value || ticks[0].value
                  )
                )
                ? formatLabel(this.getLabelForValue(+val))
                : "";
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            font: { family: "'Montserrat', sans-serif" },
          },
        },
      },
      interaction: { intersect: false, axis: "x" },
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  return chartConfig;
};

export default getChartConfig;
