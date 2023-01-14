import  type { INIT } from "../types";

type Props = {
  dataDB: INIT[];
};

const Table = ({ dataDB }: Props) => {
  const fade = {
    fontWeight: "bold",
  };

  return (
    <table className={`table table-hover w-md-50 mx-auto`}>
      <thead>
        <tr className="table-primary">
          <td className="text-center">Tensión</td>
          <td className="text-center">Fecha</td>
        </tr>
      </thead>
      <tbody className="table-body">
        {dataDB
          .slice(dataDB.length > 10 ? dataDB.length - 10 : 0, dataDB.length)
          .map((e, i, arr) => (
            <tr
              key={i}
              className="default "
              style={i === arr.length - 1 ? fade : {}}
            >
              <td className="text-center text">{e.voltage} V</td>
              <td className="text-center text">{e.current} A</td>
              <td className="text-center text">{e.temperature} °C</td>
              <td className="text-center text">
                {new Date(e.date).toLocaleString().toString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
