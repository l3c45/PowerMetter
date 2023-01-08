type Props = {
  dataDB: [
    {
      fullDocument: {
        date: Date;
        value: string;
      };
    }
  ];
};

const Table = ({ dataDB }: Props) => {
  return (
    <table className={`table table-hover`}>
      <thead>
        <tr className="table-primary">
          <td>Tension</td>
          <td>Fecha</td>
        </tr>
      </thead>
      <tbody>
        {dataDB.map((e, i) => (
          <tr key={i} className="default">
            <td>{JSON.stringify(e.fullDocument.value)}</td>
            <td>{JSON.stringify(e.fullDocument.date)}</td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};

export default Table;
