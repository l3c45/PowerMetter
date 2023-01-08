import { months } from "../utils/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = months({ count: 7 });

const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        color: "#fff",
        beginAtZero: true,
        font: {
          size: 16,
        },
      },
    },
    x: {
      ticks: {
        color: "#fff",
        beginAtZero: true,
        font: {
          size: 16,
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#fff",
        font: {
          size: 16,
        },
      },
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Niveles de tension del suministro electrico",
      color: "#fff",
      font: {
        size: 20,
      },
    },
  },
};

const data = {
  labels: labels,
  datasets: [
    {
      label: "Tension ",
      color: "#fff",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.1,
    },
  ],
};

const ChartGraph = () => {
  return <Line options={options} data={data}></Line>;
};

export default ChartGraph;

// export const options = {
//   responsive: true,
//   interaction: {
//     mode: 'index' as const,
//     intersect: false,
//   },
//   stacked: false,
//   plugins: {
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart - Multi Axis',
//     },
//   },
//   scales: {
//     y: {
//       type: 'linear' as const,
//       display: true,
//       position: 'left' as const,
//     },
//     y1: {
//       type: 'linear' as const,
//       display: true,
//       position: 'right' as const,
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//   },
// };
