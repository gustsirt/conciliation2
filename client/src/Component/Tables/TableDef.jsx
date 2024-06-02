import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, } from '@tanstack/react-table'
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi"

const TableBase = ({ data, options}) => {
  const { columns, allow } = options;
  const isPaginated = allow && allow.paginated === true;
  const isGlobalFiltered = allow && allow.globalFilter === true;

  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  
  const table = useReactTable({
    columns: columns.filter(column => !column.hidden),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : null,
    
  })

  return (
    <div>
      <table>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <th key={header.id}
                      className={header.column.columnDef.className}
                      onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {
                  row.getVisibleCells().map(cell => (
                    <td key={cell.id}
                      className={cell.column.columnDef.className}>
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
        {isPaginated && (
          <>
            <div className='pag-size'>
              <select
                value={table.options.state.pagination.pageSize}
                onChange={e => table.setPageSize(e.target.value)}>
                {[10,25,50,100].map(elem => {
                  return (
                    <option key={elem} value={elem}>
                      {elem}
                    </option>)
                })}
              </select>
              <p>Transacciones</p>
            </div>
            <div className='pagination'>
              <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}><BiChevronsLeft /> </button>
              <button onClick={() => table.previousPage()}  disabled={!table.getCanPreviousPage()}><BiChevronLeft />  </button>
              <p>Pagina {table.options.state.pagination.pageIndex+1} de {table.getPageCount()}</p>
              <button onClick={() => table.nextPage()}      disabled={!table.getCanNextPage()}>    <BiChevronRight /> </button>
              <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}><BiChevronsRight /></button>
            </div>
          </>)
        }
      </div>
    </div>
  )
}

export default TableBase