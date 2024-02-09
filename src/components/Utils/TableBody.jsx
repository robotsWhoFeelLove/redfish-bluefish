function TableBody({ data }) {
  return (
    <tbody>
      {data.map((row, index) => {
        return (
          <tr key={"row" + index}>
            {Object.values(row).map((val, j) => {
              return (
                <td className="text-slate-800 text-sm font-lato" key={"datum_" + index + "_" + j}>
                  {val}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
