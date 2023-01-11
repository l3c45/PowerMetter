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
import { useState } from "react";

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
  update: (range: number) => void;
};

type Filter = {
  [index: number]: { string: string; hours: number; offset: number };
};

const filterObj: Filter = {
  0: { string: "3h", hours: 3, offset: 3 },
  1: { string: "24h", hours: 24, offset: 20 },
  2: { string: "Semana", hours: 168, offset: 20 },
  3: { string: "Mes", hours: 720, offset: 20 },
};

const ChartGraph = ({ data, update }: Props) => {
  const [filter, setFilter] = useState(filterObj[0]);

  const updateFilter = (indexFilter: number) => {
    setFilter(filterObj[indexFilter]);
    update(filterObj[indexFilter].hours);
  };

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
        text: `Tension del suministro electrico de ${filter.string} atras `,
        color: "#fff",
        font: {
          size: 20,
        },
      },
    },
  };

  const dataSet: ChartData<"line"> = {
    labels: data
      .map((item) => +item.date)
      .filter((item, i) => i % filter.offset === 0),
    datasets: [
      {
        label: "Tension ",
        data: data
          .map((item, i) => +item.value)
          .filter((item, i) => i % filter.offset === 0),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        tension: 0,
      },
    ],
  };

  return (
    <div id="chart" className="mt-2">
      <Line options={options} data={dataSet}></Line>
      <div className="d-flex justify-content-center gap-4 py-4  ">
        <button
          onClick={() => updateFilter(0)}
          type="button"
          className="btn btn-primary custom"
        >
          3h
        </button>
        <button
          onClick={() => updateFilter(1)}
          type="button"
          className="btn btn-primary  custom"
        >
          24h
        </button>
        <button
          onClick={() => updateFilter(2)}
          type="button"
          className="btn btn-primary custom"
        >
          Semana
        </button>
        <button
          onClick={() => updateFilter(3)}
          type="button"
          className="btn btn-primary custom"
        >
          Mes
        </button>
      </div>
    </div>
  );
};

export default ChartGraph;
