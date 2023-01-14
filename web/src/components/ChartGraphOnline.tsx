import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import "chartjs-adapter-date-fns";
import StreamingPlugin from "chartjs-plugin-streaming";
import { INIT } from "../types";

ChartJS.register(
  StreamingPlugin,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data:INIT[];
};

const ChartGraphOnline = ({ data }: Props) => {
 
  const d: ChartData<"line"> = {
    datasets: [
      {
        borderColor: "rgb(75, 192, 192)",
        tension: 0.2,
        label: "Tension ",
        data: data.map((item) => ({ x: item.date, y: item.voltage })),
      },
      {
        borderColor: "rgb(0,250,154)",
        tension: 0.2,
        label: "Corriente ",
        data: data.map((item) => ({ x: item.date, y: item.current })),
      },
      {
        borderColor: "rgb(220,20,60)",
        tension: 0.2,
        label: "Temperatura",
        data: data.map((item) => ({ x: item.date, y: item.temperature })),
      },
    ],
  };

  const config: ChartOptions<"line"> = {
    responsive: true,
    animation: false,
    scales: {
      x: {
        type: "realtime",
        realtime: {
          refresh: 1000,
          duration: 20000,
          frameRate: 30,
          delay: 0,
          // onRefresh: (chart) => {
          //   setD((prev) => [...prev, { x: Date.now(), y: Math.random() }]);
          //   //chart.data.datasets[0].data.push({ x: Date.now(), y: 10 });
          // },
        },
        ticks: {
          color: "#fff",
          // callback: (val,i) => {
          //   return `${new Date(val).getHours()}:${new Date(val).getMinutes()}:${new Date(val).getSeconds()}`
          //  },
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

  return (
    <div className="mb-5">
      <Line data={d} options={config} />
    </div>
  );
};

export default ChartGraphOnline;
