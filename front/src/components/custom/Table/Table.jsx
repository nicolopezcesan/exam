import BootstrapTable from 'react-bootstrap/Table';

const Table = ({ columns, data }) => {
  return (
    <BootstrapTable striped bordered hover>
      <thead>
        <tr>
          {columns.map((c) => {
            return <th>{c.label || '-'}</th>
          })}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => {
              return <td>{row[c.name] || '-'}</td>
            })}
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  );
}

export default Table;