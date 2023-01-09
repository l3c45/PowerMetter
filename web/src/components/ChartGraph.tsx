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
import StreamingPlugin from "chartjs-plugin-streaming";
import "chartjs-plugin-streaming";
import "chartjs-adapter-moment";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  StreamingPlugin
);

const options: ChartOptions<"line"> = {
  spanGaps: 1000 * 60,
  elements: {
    point: {
      radius: 0,
    },
  },
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#fff",
        font: {
          size: 16,
        },
      },
    },
    x: {
      type: "time",
      ticks: {
        color: "#fff",
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
      text: "Tension del suministro electrico ultima hora",
      color: "#fff",
      font: {
        size: 20,
      },
    },
  },
};

type Props = {
  data: {
    _id: number;
    value: string;
    date: number;
    _v: number;
  }[];
};

const ChartGraph = ({ data }: Props) => {
  const dataSet: ChartData<"line"> = {
    labels: data.map((item) => +item.date),
    datasets: [
      {
        label: "Tension ",
        data: data.map((item) => +item.value),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        tension: 0,
      },
    ],
  };

  return <Line options={options} data={dataSet}></Line>;
};

export default ChartGraph;
