const useTableSimple = () => {
  const getValues = (row, column) => {
      return {
        rowid: row.original._id,
        column: column.id,
        value: row.original[column.id]
      }
  }
  return { getValues }
}

export default useTableSimple