/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { INIT } from "../types";

interface Props {
    customStyle:string
    last:INIT
}

const Aside = ({customStyle,last}:Props) => {

  const [acc, setAcc] = useState<number>(0)
  const [time, setTime] = useState(0)

const {voltage,current}=last
const KwH=(((voltage*current)/60)/1000).toFixed(2)

useEffect(() => {
  setAcc(prev=>prev+ +KwH)
}, [last])

useEffect(() => {
  let interval = setInterval(() => {
  setTime((prev) => prev + 1);
  }, 1000);
 
  return () => {
  clearInterval(interval);
  };
  }, []);


  const timer=():string=>{
    console.log("llamada")
if (time<10){
  return `00:0${time}`
}else if (time<60){
  return  `00:${time}`
}

const minute=Math.trunc(time/60)
const seconds=time-(minute*60)

return `${minute}:${seconds<10?"0"+seconds:seconds}`
  }


  return (
    <aside className={`${customStyle}`} >
      <div className="row justify-content-center" >
      <section className="col-5 col-lg-12   text-center rounded border border-primary m-1 py-1"> 
        <p  className=" fw-bold mb-2" >Tension</p>
        <h3 className=" t mb-0 mt-2">{voltage} V</h3>
      </section>
      <section className=" col-5 col-lg-12  text-center rounded border border-primary m-1 py-1">
        <p className=" fw-bold mb-2">Corriente</p>
        <h3 className=" t mb-0 mt-2">{current} A</h3>
      </section>

      <section className=" col-5 col-lg-12  text-center rounded border border-primary m-1 py-1">
        <p className=" fw-bold mb-2">Potencia</p>
        <h3 className=" t mb-0 mt-2">{voltage*current} W</h3>
      </section>
      <section className="  overflow-hidden col-5 col-lg-12   text-center rounded border border-primary m-1 py-1">
        <p className=" fw-bold mb-2">Consumo</p>
        <h3 className="   mb-0 mt-2">{KwH} Kw/h </h3>
      </section>
      <section className="col-5 col-lg-12   text-center rounded border border-primary m-1 py-1">
        <p className=" fw-bold mb-2">Acumulado sesion</p>
        <h3 className=" t mb-0 mt-2">{acc.toFixed(2)} Kw/h</h3>
      </section>
      <section className="col-5 col-lg-12   text-center rounded border border-primary m-1 py-1">
        <p className=" fw-bold mb-2">Tiempo de sesion</p>
        <h3 className=" t mb-0 mt-2">{timer()}</h3>
      </section>
      </div>
    </aside>

  );
};

export default Aside;
