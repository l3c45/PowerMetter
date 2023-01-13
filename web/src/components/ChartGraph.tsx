
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

import { LTTB } from "../utils/LTTB";
import { useState } from "react";



ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Decimation,
  
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

  const a=LTTB(
    [...data]
      .map((item, i) => ({x:item.date,y:+item.value}))
      .sort((a,b)=>a.x-b.x),
      70,"x","y"


  )
  

  const updateFilter = (indexFilter: number) => {
    setFilter(filterObj[indexFilter]);
    update(filterObj[indexFilter].hours);
  };

  const options: ChartOptions<"line"> = {
   //spanGaps: 1000 * 60,
   spanGaps:10000000,
   animation: false,

    elements: {
      point: {
        radius: 1,
      },
    },
    responsive: true,
    scales: {
      y: {
        type: "linear",
        min:0,
        max:250,
        beginAtZero: true,
        ticks: {
          color: "#fff",
          font: {
            size: 16,
          },
        },
      },
      x: {
         min:(Date.now()-filter.hours*3600*1000),
        max :Date.now(),
        type: "time",
       
        ticks: {
          source: 'auto',
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
      // decimation:{
      //   enabled:true,
      //   algorithm:"lttb",
      //   samples: 5,
      //   threshold: 1999
       
        

      // },
      
    },
  };

  let dataSet: ChartData<"line"> = {
    datasets: [
      
      {
        // normalized:true,
        // parsing:false,
        indexAxis:"x",
        
        label: "Tension ",
        data: a,
        // [...data]
        //   .map((item, i) => ({x:item.date,y:+item.value}))
        //   .sort((a,b)=>a.x-b.x),
          //.filter((item, i) => item.x%filter.offset === 0),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        borderDash:[],
        tension: 0.2,
        stepped:false,
        
      },
    ],
  };

  return (
    <div id="chart" className="mt-2">
      <Line  options={options} data={dataSet}></Line>
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
