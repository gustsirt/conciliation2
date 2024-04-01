import {useState}  from 'react'
import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel} from '@tanstack/react-table'
import PropTypes from 'prop-types'; 
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi"

const SimpleTablePaginada = ({ data, columns} ) => {

  const [sorting, setSorting] = useState([])  
  const [filtering, setFiltering] = useState("")

  const table = useReactTable({
    columns: columns.filter(column => !column.hidden),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), 
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
}) 

  return (
    <div>
      <div className='table-options'>
        <input
          type="text"
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
          placeholder='Filtrar'
        />
      </div>
      <table>
        <thead>
          {
            table.getHeaderGroups().map( headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map( header => (
                    <th key={header.id} 
                    onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{asc: "⬆", desc: "⬇"}[header.column.getIsSorted() ?? null]}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map( row => (
              <tr key={row.id}>
                {
                  row.getVisibleCells().map( cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='table-footer'>
        <button onClick={() => table.setPageIndex(0)}><BiChevronsLeft /> </button>
        <button onClick={() => table.previousPage()}> <BiChevronLeft />  </button>
        <button onClick={() => table.nextPage()}>     <BiChevronRight /> </button>
        <button onClick={() => table.setPageIndex(table.getPageCount()-1)}><BiChevronsRight /></button>
      </div>
    </div>
  )
}

SimpleTablePaginada.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
};

export default SimpleTablePaginada