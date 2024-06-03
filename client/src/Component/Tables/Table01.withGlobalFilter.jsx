import { useEffect, useRef, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi"

const TableWithGlobalFilter = ({ data, columns, handleCellClick, selectedValue }) => {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data: data,
    columns: columns.filter(column => !column.hidden),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString'
  })

  const handleClick = handleCellClick || (() => { });
  const tableRef = useRef(null);

  // limpia el filtro al seleccionar afuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        setGlobalFilter("");
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Aplicar filtro basado en el valor seleccionado
  useEffect(() => {
    if (selectedValue && selectedValue.value !== undefined) {
      setGlobalFilter(String(selectedValue.value));
    } else {
      setGlobalFilter("");
    }
  }, [selectedValue])

  return (
    <div ref={tableRef}>
      <div className='table-options'>
        <input
          type="text"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder='Filtrar'
        />
      </div>
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
                      className={cell.column.columnDef.className}
                      onClick={() => handleClick(row, cell.column)}>
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

export default TableWithGlobalFilter