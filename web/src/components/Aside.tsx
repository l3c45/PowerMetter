import { INIT } from "../types";

interface Props {
    customStyle:string
    last:INIT
}

const Aside = ({customStyle,last}:Props) => {

const {voltage,current,temperature}=last
const KwH=((voltage*current)/3).toFixed(1)

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
        <h3 className=" inline  mb-0 mt-2">{KwH} </h3><span>KW/h</span>
      </section>
      <section className="col-5 col-lg-12   text-center rounded border border-primary m-1 py-1">
        <p className=" fw-bold mb-2">Temp.</p>
        <h3 className=" t mb-0 mt-2">{temperature} °C</h3>
      </section>
      </div>
    </aside>

  );
};

export default Aside;
