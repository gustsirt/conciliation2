const useTableSimple = (allowedColumns = []) => {
  const getValues = (row, column) => {
      return {
        rowid: row.original._id,
        column: column.id,
        value: row.original[column.id]
      }
  }

  const getValuesLimited = (row, clickedColumn) => {
    const column = allowedColumns.find(column => column === clickedColumn.id);
    if (!column) return null;
    console.log(row);
    return {
      rowid: row.original._id,
      column: clickedColumn.id,
      value: row.original[clickedColumn.id]
    };
  };

  return { getValues, getValuesLimited }
}

export default useTableSimple
