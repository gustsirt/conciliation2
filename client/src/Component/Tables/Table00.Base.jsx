import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi"

const TableBase = ({ data, columns}) => {

  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    columns: columns.filter(column => !column.hidden),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting
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
                      {{ asc: "⬆", desc: "⬇" }[header.column.getIsSorted() ?? null]}
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
        <button onClick={() => table.setPageIndex(0)}><BiChevronsLeft /> </button>
        <button onClick={() => table.previousPage()}> <BiChevronLeft />  </button>
        <button onClick={() => table.nextPage()}>     <BiChevronRight /> </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}><BiChevronsRight /></button>
      </div>
    </div>
  )
}

export default TableBase