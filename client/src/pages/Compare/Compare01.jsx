import dayjs from 'dayjs';
import './compare.scss';
import useTableSimple from '../../Component/Tables/hooks/useTableSimple';
import { useContext, useState } from 'react';
import { ContextFiles } from '../../Context/ContextFiles';
import useFetchService from '../../hooks/useFetchService';
import TableInit from '../../Component/Tables/TableInit';
import IndeterminateCheckbox from '../../Component/Tables/Helper/IndeterminateCheckBox.jsx';
import { useEffect } from 'react';

const Compare01 = () => {
  const { backendFilter01, backendFilter02} = useContext(ContextFiles)
  const { postData, deleteData } = useFetchService();
  const [linking, setLinking ] = useState(false)
  const [refresh, setRefresh] = useState(false);

  // configura posibles valores tomados para filtrar ------------
  const {getValuesLimited} = useTableSimple(["flag", "origin_date", "batch", "number", "amount"])
  const logcell1 = async (row, column) => setSelectedValue1(getValuesLimited(row, column))
  const logcell2 = async (row, column) => setSelectedValue2(getValuesLimited(row, column))

  const [selectedValue1, setSelectedValue1] = useState({});
  const [selectedValue2, setSelectedValue2] = useState({}); 
  const [rowSelection1, setRowSelection1] = useState([])
  const [rowSelection2, setRowSelection2] = useState([])

  // configuracion tabla 01 ------------
  const table01 = {
    backend: {
      endpoint: 'api/files/01/',
      filter: backendFilter01,
      refresh: 0
    },
    tableOptions: {
      allow: {
        paginated: true,
        sort: true,
        globalFilter: true,
        selector: true,
      },
      handleCellClick: logcell1,
      rowSelection: rowSelection1,
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
      filter: backendFilter02,
      refresh: 0
    },
    tableOptions: {
      allow: {
        paginated: true,
        sort: true,
        globalFilter: true,
        selector: true,
      },
      handleCellClick: logcell2,
      rowSelection: rowSelection2,
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
        { header: 'F. Origen',    accessorKey: 'origin_date',
          cell: (info) => dayjs(info.getValue()).format('DD/MM'), format: 'date',   },
        { header: 'Lote',         accessorKey: 'batch',           format: 'number', },
        { header: 'Cupon',        accessorKey: 'number',          format: 'number', },
        { header: 'Monto',        accessorKey: 'amount',          format: 'currency',},
        { header: 'Cliente',      accessorKey: 'client',          format: 'text',   },
        { header: 'Casos',        accessorKey: 'meetings',        format: 'number', enableGlobalFilter: false, className: 'meeting',},
        { header: 'Id2',          accessorKey: 'idMeeting',        format: 'text',  enableGlobalFilter: false, className: 'meeting',
          cell: ({ row }) => row.original.idMeeting ? row.original.idMeeting.slice(-5) : '',    },
        { header: 'Error',        accessorKey: 'error',           format: 'number', enableGlobalFilter: false, className: 'meeting',},
      ],
    }
  }

  // operaciones de Conciliacion ------------
  const handleLink = async () => {
    setLinking(true);
    const body = {configObject: {filter01, filter02 }};
    // console.log(body);
    await postData('api/link/mark', body);
    setLinking(false);
    setRefresh(!refresh);
  }
  const handleClean = async () => {
    setLinking(true);
    const body = {configObject: {filter01, filter02 }};
    // console.log(body);
    await deleteData('api/link/mark', body);
    setLinking(false);
    setRefresh(!refresh);
  }

  useEffect(()=>{
    console.log("tabla 1: ",rowSelection1);
    console.log("tabla 2: ",rowSelection2);
  },[rowSelection1, rowSelection2])

  return (
    <div>
      <h1 className='title'>Comparación</h1>
      <div className='button-actions'>
        { linking
          ? (<p>Procesando info...</p>)
          : (<>
            <button onClick={() => {handleLink()}}> - Linkear Tablas -</button>
            <button onClick={() => {handleClean()}}> - Borrar Marcas -</button>
          </>)
        }
      </div>
      <div className='tables-container'>
        <div>
          <h2 className='title-table'>Tabla 01 - tarjeta</h2>
          <TableInit
            backend = {table01.backend}
            tableOptions = {table01.tableOptions}
          />
        </div>
        <div>
          <h2 className='title-table'>Tabla 02 - cupones</h2>
          <TableInit
            backend = {table02.backend}
            tableOptions = {table02.tableOptions}
          />
        </div>
      </div>
    </div>
  )
}

export default Compare01