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

type Props = {
  data: {
    _id: number;
    value: string;
    date: number;
    _v: number;
  }[];
};

const ChartGraphOnline = ({ data }: Props) => {
  const options: ChartOptions<"line"> = {
    animation: false,

    responsive: true,
    scales: {
      x: {
        type: "realtime",

        realtime: {
          refresh: 1000,
          delay: 1000,
        },

        ticks: {
          color: "#fff",

          font: {
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
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
        text: "Tension del suministro electrico en tiempo real",
        color: "#fff",
        font: {
          size: 20,
        },
      },
    },
  };

  const dataSet: ChartData<"line"> = {
    datasets: [
      {
        label: "Tension ",
        data: data.map((item) => ({ x: item.date, y: +item.value })),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <Line options={options} data={dataSet}></Line>
    </>
  );
};

export default ChartGraphOnline;
