import { useEffect, useMemo, useRef, useState } from 'react'
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
  
  const isSelection = allow && allow.selector === true;
  const sendRowSelection = isSelection && options.setRowSelection || undefined;
  const [rowSelection, setRowSelection] = useState({});

  const permitSelectClick = allow.selectClick === true;
  const handleClick = handleCellClick || (() => { });
  const tableRef = useRef(null); // se usa para limpiar filtro global

  const colSummary = allow.summary || undefined;
  const especialSummary = allow.especialSummary || false;

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmount1, setTotalAmount1] = useState(0);
  const [totalAmount2, setTotalAmount2] = useState(0);

  const table = useReactTable({
    columns: columns.filter(column => !column.hidden),
    data: datadef,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: isSorted ? getSortedRowModel() : undefined,
    getFilteredRowModel: isGlobalFiltered ? getFilteredRowModel() : undefined,
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : undefined,
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
      rowSelection: rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    onRowSelectionChange: setRowSelection,
    enableRowSelection: isSelection,
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

  // Actualiza la selección de filas en options.setRowSelection
  useEffect(() => {
    if (sendRowSelection) {
      const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);
      sendRowSelection(selectedRows);
    }
  }, [rowSelection]);

  // Obtener Totales
  useEffect(() => {
    if (colSummary) {
      let total = 0;
      table.getRowModel().rows.forEach(row => {
        total += Number(row.original[colSummary]);
      });
      setTotalAmount(total);
    }
    if(especialSummary) {
      let total1 = 0, total2 = 0, total3 = 0;
      table.getRowModel().rows.forEach(row => {
        total1 += Number(row.original.totalData01);
        total2 += Number(row.original.totalData02);
        total3 += Number(row.original.totalData01) - Number(row.original.totalData02);
      });
      setTotalAmount1(total1);
      setTotalAmount2(total2);
      setTotalAmount(total3);
    }
  }, [table.getRowModel().rows]);


  return (
    <div ref={tableRef}>
      <div className='table-options'>
        <div>
          { isGlobalFiltered && <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder='Filtrar'
        />}
        </div>
        { isPaginated && 
          <div className='pagination'>
              <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}><BiChevronsLeft /> </button>
              <button onClick={() => table.previousPage()}  disabled={!table.getCanPreviousPage()}><BiChevronLeft />  </button>
              <p>Pagina {table.options.state.pagination.pageIndex+1} de {table.getPageCount()}</p>
              <button onClick={() => table.nextPage()}      disabled={!table.getCanNextPage()}>    <BiChevronRight /> </button>
              <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}><BiChevronsRight /></button>
          </div> }
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
                      onClick={permitSelectClick ? () => handleClick(row, cell.column) : undefined}
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
        { isPaginated && <div className='pag-size'>
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
        </div>}
      </div>
      {colSummary && (<div className='summary'>
        <p>Total del Monto:</p>
        <h2>{Intl.NumberFormat('es-ES').format(totalAmount)}</h2>
      </div>)}
      {especialSummary && (<>
        <div className='summary'>
          <p>Total Tarjetas:</p>
          <h2>{Intl.NumberFormat('es-ES').format(totalAmount1)}</h2>
        </div>
        <div className='summary'>
          <p>Total Cupones:</p>
          <h2>{Intl.NumberFormat('es-ES').format(totalAmount2)}</h2>
        </div>
        <div className='summary'>
          <p>Diferencia:</p>
          <h2>{Intl.NumberFormat('es-ES').format(totalAmount)}</h2>
        </div>
      </>)}
    </div>
  )
}

export default TableBase