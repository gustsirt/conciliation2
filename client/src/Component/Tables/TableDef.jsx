import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, } from '@tanstack/react-table'
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi"

const TableBase = ({ data, options}) => {
  const { allow, handleCellClick, globalFilterValue } = options;
  
  const datadef = useMemo(() => data, [data]);
  const columns = useMemo(() => options.columns, [options.columns]);
  
  const isPaginated = allow && allow.paginated === true;

  const isSorted = allow && allow.sort === true;
  const [sorting, setSorting] = useState([])

  const isGlobalFiltered = allow && allow.globalFilter === true;
  const [globalFilter, setGlobalFilter] = useState("")
  
  const handleClick = handleCellClick || (() => { });
  const tableRef = useRef(null); // se usa para limpiar filtro global

  const table = useReactTable({
    columns: columns.filter(column => !column.hidden),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: isSorted ? getSortedRowModel() : undefined,
    getFilteredRowModel: isGlobalFiltered ? getFilteredRowModel() : undefined,
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : undefined,
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
  })

  // limpia el filtro global al seleccionar afuera
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

  // Aplicar filtro global basado en el valor seleccionado de la otra tabla
  useEffect(() => {
    if (globalFilterValue && globalFilterValue.value !== undefined) {
      setGlobalFilter(String(globalFilterValue.value));
    } else {
      setGlobalFilter("");
    }
  }, [globalFilterValue])

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
                      onClick={isSorted ? header.column.getToggleSortingHandler() : undefined}
                      >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                      )}
                      {isSorted ? { asc: "⬆", desc: "⬇" }[header.column.getIsSorted() ?? null ] : undefined }
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
                      onClick={isGlobalFiltered ? () => handleClick(row, cell.column) : undefined}
                    >
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
                onChange={e => table.setPageSize(Number(e.target.value))}
              >
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