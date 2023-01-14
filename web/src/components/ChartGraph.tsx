import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Decimation,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import { useMemo, useState } from "react";
import type { DataState } from "../types";

ChartJS.register(
  zoomPlugin,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Decimation
);

type Props = {
  data: DataState;
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
  const [filter, setFilter] = useState(filterObj[1]);

  const updateFilter = (indexFilter: number) => {
    setFilter(filterObj[indexFilter]);
    update(filterObj[indexFilter].hours);
  };

  const options :ChartOptions<"line"> = useMemo(
    () => ({
      transitions: {
        zoom: {
          animation: {
            duration: 0,
          },
        },
      },
      //spanGaps: 1000 * 60,
      spanGaps: 10000000,
      //  animation: true,

      elements: {
        point: {
          radius: 1,
        },
      },
      responsive: true,
      scales: {
        y: {
          type: "linear",
          min: 0,
          max: 250,
          beginAtZero: true,
          ticks: {
            color: "#fff",
            font: {
              size: 16,
            },
          },
        },
        x: {
          min: Date.now() - filter.hours * 3600 * 1000,
          max: Date.now(),
          type: "time",

          ticks: {
            source: "auto",
            // Disabled rotation for performance
            maxRotation: 0,
            autoSkip: true,
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
        zoom: {
          pan: {
            enabled: false,
            mode: "xy", // Allow panning in the x direction
            modifierKey: "ctrl",
          },

          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
        // decimation:{
        //   enabled:true,
        //   algorithm:"lttb",
        //   samples: 5,
        //   threshold: 100
        // },
      },
    }),
    [filter]
  );

  let dataSet: ChartData<"line"> = {
    datasets: [
      {
        // normalized:true,
        // parsing:false,
        indexAxis: "x",
        label: "Tension ",
        data: data.voltage,
        // [...data]
        //   .map((item, i) => ({x:item.date,y:+item.value}))
        //   .sort((a,b)=>a.x-b.x),
        //.filter((item, i) => item.x%filter.offset === 0),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        borderDash: [],
        tension: 0.4,
        stepped: false,
      },
      {
        // normalized:true,
        // parsing:false,
        indexAxis: "x",
        label: "Corriente ",
        data: data.current,
        // [...data]
        //   .map((item, i) => ({x:item.date,y:+item.value}))
        //   .sort((a,b)=>a.x-b.x),
        //.filter((item, i) => item.x%filter.offset === 0),
        fill: false,
        borderColor: "rgb(0,250,154)",
        borderWidth: 1,
        borderDash: [],
        tension: 0.4,
        stepped: false,
      },
      {
        // normalized:true,
        // parsing:false,
        indexAxis: "x",
        label: "Temperatura ",
        data: data.temperature,
        // [...data]
        //   .map((item, i) => ({x:item.date,y:+item.value}))
        //   .sort((a,b)=>a.x-b.x),
        //.filter((item, i) => item.x%filter.offset === 0),
        fill: false,
        borderColor: "rgb(220,20,60)",
        borderWidth: 1,
        borderDash: [],
        tension: 0.4,
        stepped: false,
      },
    ],
  };

  return (
    <div id="chart" className="mt-2 w-100 h-100">
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
