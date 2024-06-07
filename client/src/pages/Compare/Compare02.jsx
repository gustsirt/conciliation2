import { useEffect } from 'react';
import dayjs from 'dayjs';
import './compare.scss';
import { useContext, useState } from 'react';
import { ContextFiles } from '../../Context/ContextFiles.jsx';
import IndeterminateCheckbox from '../../Component/Tables/Helper/IndeterminateCheckBox.jsx';
import useTableSimple from '../../Component/Tables/hooks/useTableSimple.jsx';
import useConciliation from '../../hooks/useConciliarion.jsx';
import TableInit from '../../Component/Tables/TableInit.jsx';

const Compare = () => {
  const { backendFilter01, backendFilter02} = useContext(ContextFiles) // se pasa parametro
  const { linking, refresh, handleLink, handleClean, marking, unmarking } = useConciliation(backendFilter01, backendFilter02);

  // configura posibles valores tomados para filtrar ------------
  const {getValuesLimited} = useTableSimple(["flag", "origin_date", "batch", "number", "amount"])
  const logcell1 = async (row, column) => setSelectedValue1(getValuesLimited(row, column))
  const logcell2 = async (row, column) => setSelectedValue2(getValuesLimited(row, column))

  const [selectedValue1, setSelectedValue1] = useState({});
  const [selectedValue2, setSelectedValue2] = useState({});
  const [rowSelection1, setRowSelection1] = useState([]);
  const [rowSelection2, setRowSelection2] = useState([]);

  // useEffect(()=>{
  //   console.log("tabla 1: ",rowSelection1);
  //   console.log("tabla 2: ",rowSelection2);
  // },[rowSelection1, rowSelection2])

  // configuracion tabla 00 Summary ------------
  const table00 = {
    backend: {
      endpoint: 'api/link/summary',
      filter: backendFilter01,
      refresh,
    },
    tableOptions: {
      allow: {
        paginated: true,
        sort: true,
        especialSummary: true,
      },
      columns: [
        {
          header: 'F. Pago',
          accessor: 'payment_date',
          cell: (info) => dayjs(info.getValue()).format('DD/MM'),
          format: 'date',
        },
        {
          header: 'Tarjeta',
          accessorKey: 'totalData01',
          cell: (cel) => new Intl.NumberFormat('es-ES').format(cel.getValue()),
        },
        {
          header: 'Cupones',
          accessorKey: 'totalData02',
          cell: (cel) => new Intl.NumberFormat('es-ES').format(cel.getValue()),
        },
        {
          header: 'Diferencia',
          accessorFn: (row)=>row.totalData01-row.totalData02,
          cell: (cel) => new Intl.NumberFormat('es-ES').format(cel.getValue()),
        },
      ]
    }
  }

  // configuracion tabla 01 ------------
  const table01 = {
    backend: {
      endpoint: 'api/files/01/',
      endpointfilter: 'api/files/01/',
      filter: backendFilter01,
      refresh,
    },
    tableOptions: {
      allow: {
        paginated: true,
        sort: true,
        globalFilter: true,
        selector: true,
      },
      handleCellClick: logcell1,
      setRowSelection: setRowSelection1,
      globalFilterValue: selectedValue2,
      columns: [
        { 
          id: "select",
          header: ({ table }) => (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ),
        },
        { header: 'ID',           accessorKey: '_id',             format: 'text',   enableGlobalFilter: false,   
          cell: ({ row }) => row.original._id ? row.original._id.slice(-5) : '',    },
        { header: 'Servicio',     accessorKey: 'service',         format: 'text',   enableGlobalFilter: false,},
        { header: 'N Com',        accessorKey: 'business_number', format: 'text',   enableGlobalFilter: false,},
        { header: 'Bandera',      accessorKey: 'flag',            format: 'text',   enableGlobalFilter: false,},
        { header: 'F. Origen',    accessorKey: 'origin_date',
          cell: (info) => dayjs(info.getValue()).format('DD/MM'), format: 'date',   },
        { header: 'Lote',         accessorKey: 'batch',           format: 'number', },
        { header: 'Cupon',        accessorKey: 'number',          format: 'number', },
        { header: 'Monto',        accessorKey: 'amount',          format: 'currency',},
        { header: 'F. Pago',      accessorKey: 'payment_date',
          cell: (info) => dayjs(info.getValue()).format('DD/MM'), format: 'date',   },
        { header: 'Casos',        accessorKey: 'meetings',        format: 'number', enableGlobalFilter: false, className: 'meeting',
          meta:   { filterVariant: 'select', },
        },
        { header: 'Id2',          accessorKey: 'idMeeting',        format: 'text',  enableGlobalFilter: false, className: 'meeting',
          cell: ({ row }) => row.original.idMeeting ? row.original.idMeeting.slice(-5) : '',    },
        { header: 'Error',        accessorKey: 'error',           format: 'number', enableGlobalFilter: false, className: 'meeting'},
      ],
    }
  }

  // configuracion tabla 02 ------------
  const table02 = {
    backend: {
      endpoint: 'api/files/02/',
      endpointfilter: 'api/files/02/',
      filter: backendFilter02,
      refresh,
    },
    tableOptions: {
      allow: {
        paginated: true,
        sort: true,
        globalFilter: true,
        selector: true,
      },
      handleCellClick: logcell2,
      setRowSelection: setRowSelection2,
      globalFilterValue: selectedValue1,
      columns: [
        { 
          id: "select",
          header: ({ table }) => (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ),
        },
        {
          header: 'ID',           accessorKey: '_id',             format: 'text',   enableGlobalFilter: false,
          cell: ({ row }) => row.original._id ? row.original._id.slice(-5) : '',    },
        { header: 'Bandera',      accessorKey: 'flag',            format: 'text',   enableGlobalFilter: false,},
        { header: 'F. Origen',    accessorKey: 'origin_date',     format: 'date',
          cell: (info) => dayjs(info.getValue()).format('DD/MM'), },
        { header: 'Lote',         accessorKey: 'batch',           format: 'number', },
        { header: 'Cupon',        accessorKey: 'number',          format: 'number', },
        { header: 'Monto',        accessorKey: 'amount',          format: 'currency',},
        { header: 'Cliente',      accessorKey: 'client',          format: 'text',   },
        { header: 'Casos',        accessorKey: 'meetings',        format: 'number', enableGlobalFilter: false, className: 'meeting',},
        { header: 'Id2',          accessorKey: 'idMeeting',       format: 'text',  enableGlobalFilter: false, className: 'meeting',
          cell: ({ row }) => row.original.idMeeting ? row.original.idMeeting.slice(-5) : '',    },
        { header: 'F.Pago',       accessorKey: 'payment_date',    format: 'date', enableGlobalFilter: false, className: 'meeting',
          cell: (cel) => displayPaymentDate(cel.getValue()), },
      ],
    }
  }

  // Auxiliar de Columnas
  const displayPaymentDate = (paymentDate) => {
    if (!paymentDate) { return ""; }
    const date = dayjs(paymentDate);
    return date.isValid() ? date.format('DD/MM') : "";
  };

  return (
    <div>
      <h1 className='title'>Comparación</h1>
      <div className='button-actions'>
        { linking
          ? (<p>Procesando info...</p>)
          : (<>
            <button onClick={handleLink}>Linkear Tablas</button>
            <button onClick={handleClean}>Borrar Marcas</button>
            <button onClick={() => marking(rowSelection1, rowSelection2  )}>Mark</button>
            <button onClick={() => unmarking(rowSelection1, rowSelection2)}>UnMark</button>
          </>)
        }
      </div>
      <div className='tables-container'>
        <div>
          <h2 className='title-table'>RESUMEN COMPARATIVO</h2>
          <TableInit
            backend = {table00.backend}
            tableOptions = {table00.tableOptions}
          />
          <p>- Mejorar apariencia </p>
          <p>- OJO que summary data02 no no filtra los IsClosed</p>
        </div>
        <div>
          <h2 className='title-table'>Tabla 01 - tarjeta</h2>
          <TableInit
            backend = {table01.backend}
            tableOptions = {table01.tableOptions}
          />
          <p>- Pensando reemplazar error por diferencia</p>
          <p>- A analizar despues caso 1 fila tarjeta = 2 filas cupon</p>
        </div>
        <div>
          <h2 className='title-table'>Tabla 02 - cupones</h2>
          <TableInit
            backend = {table02.backend}
            tableOptions = {table02.tableOptions}
          />
          <p>- Pensando reemplazar error por fecha de pago (segun tarjeta)</p>
          <p>- A analizar despues caso 2 filas tarjeta = 1 fila cupon</p>
        </div>
      </div>
    </div>
  )
}

export default Compare