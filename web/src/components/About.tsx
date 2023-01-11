const About = () => {
  return (
    <div className="px-4 my-5">
      <h4 className="display-6 py-3">Acerca de este Proyecto</h4>
      <p className={"text-justify lead first"}>
        Ademas de desarrollador web , soy técnico electromecánico , lo que me
        mantiene interactuando con diversas maquinas e instalaciones. En algunas
        ocasiones ocurren fallas que son dificiles de diagnosticar en un corto
        plazo , con lo cual resolverlas se vuelve una tarea costosa en cuanto a
        tiempo . Para resolverlas, es necesario conocer las variaciones de las
        magnitudes electricas , asi poder efectuar un analisis y llegar a un
        diagnostico correcto.
      </p>
      <p className={"text-justify lead"}>
        A raiz de esta problematica surgio la idea de este proyecto.El mismo
        consiste de tres etapas:
        <ul>
          <li>Adquisicion</li>
          <li>Almacenamiento </li>
          <li>Visualizacion </li>
        </ul>
      </p>

      <h5>Adquisicion de datos</h5>
      <p className={"text-justify lead"}>
        Para esta tarea se utilizó una placa Arduino Mega 2560,un divisor de
        tensión para la medición de voltaje, un ADC ACS712 y Transformador de
        intensidad para la medición de corriente. Además , para medición de
        temperatura, se agregó una termoresistencia NTC de 10k. La placa ejecuta
        un programa que toma las mediciones, las transmite por puerto serial y
        son recibidas por un servidor Node corriendo de forma local. En un
        futuro tengo pensado implementar el chip ESP8622 para reemplazar al
        servidor local, de esta forma la placa Arduino se conectaría
        directamente a la base de datos.
      </p>

      <h5>Almacenamiento en Base de Datos</h5>
      <p className={"text-justify lead"}>
        Consiste en un servidor de Node corriendo en Pc que toma los dato del
        puerto serial, acondiciona los datos y los almacena en MongoDB.{" "}
      </p>

      <h5>Visualización de información </h5>
      <p className={"text-justify lead"}>
        Página web construida con React, que muestra la información de las
        magnitudes eléctricas. Permite ver el historial de la información
        almacenada y, si la placa está transmitiendo, se puede ver la
        información en tiempo real.{" "}
      </p>
    </div>
  );
};

export default About;
