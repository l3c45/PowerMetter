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
  update:(range:number)=>void
};

type Filter={
 [index: number]:{string:string,hours:number}
  
}



const filterObj:Filter={
  0:{string:"3h",hours:3},
  1:{string:"24h",hours:24},
  2:{string:"Semana",hours:168},
  3:{string:"Mes",hours:720}
}

const ChartGraph = ({ data ,update}: Props) => {
const [filter, setFilter] = useState("3h")


const  updateFilter=(indexFilter:number)=>{

  setFilter(filterObj[indexFilter].string)
  update(filterObj[indexFilter].hours)
}

const options: ChartOptions<"line"> = {
  animation: false,
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
      text: `Tension del suministro electrico de ${filter} atras`,
      color: "#fff",
      font: {
        size: 20,
      },
    },
  },
};

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

  return (
    <>
      <Line options={options} data={dataSet}></Line>
      <div className="d-flex justify-content-center gap-5 p-4 w ">
      <button onClick={()=>updateFilter(0)} type="button" className="btn btn-primary custom">3h</button>
      <button onClick={()=>updateFilter(1)} type="button" className="btn btn-primary  custom">24h</button>
      <button onClick={()=>updateFilter(2)} type="button" className="btn btn-primary custom">Semana</button>
      <button onClick={()=>updateFilter(3)} type="button" className="btn btn-primary custom">Mes</button>

        
      </div>
    </>
  );
};

export default ChartGraph;
