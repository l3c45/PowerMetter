type Props = {
  dataDB: 
    {
        date: number;
        value: string;
    }[]
  ;
};

const Table = ({ dataDB }: Props) => {


  return (
    <table className={`table table-hover`}>
      <thead>
        <tr className="table-primary">
          <td className="text-center">Tensión</td>
          <td className="text-center">Fecha</td>
        </tr>
      </thead>
      <tbody>
        {dataDB.slice((dataDB.length>10?dataDB.length-10:0),dataDB.length).map((e, i) => (
          <tr key={i} className="default">
            <td className="text-center">{e.value}</td>
            <td className="text-center">{new Date(e.date).toLocaleString().toString()}</td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};

export default Table;
