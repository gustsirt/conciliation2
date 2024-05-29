import dayjs from 'dayjs';
import './compare.scss';
import useTableSimple from '../../Component/Tables/hooks/useTableSimple';
import { useContext, useState } from 'react';
import { ContextFiles } from '../../Context/ContextFiles';
import useFetchService from '../../hooks/useFetchService';
import Table01Init from '../../Component/Tables/Table01.init';

const Compare01 = () => {
  const { filter01, filter02 } = useContext(ContextFiles)
  const { postData, deleteData } = useFetchService();
  const [linking, setLinking ] = useState(false)
  const [refresh, setRefresh] = useState(false);

  // configuracion tabla 01 ------------
  const endpoint1 = 'api/files/01/';
  const columns1 = [
    { header: 'ID',           accessorKey: '_id',             format: 'text',   
      cell: ({ row }) => row.original._id ? row.original._id.slice(-5) : '',    },
    { header: 'Servicio',     accessorKey: 'service',         format: 'text',   },
    { header: 'N Com',        accessorKey: 'business_number', format: 'text',   },
    { header: 'Bandera',      accessorKey: 'flag',            format: 'text',   },
    { header: 'F. Origen',    accessorKey: 'origin_date',
      cell: (info) => dayjs(info.getValue()).format('DD/MM'), format: 'date',   },
    { header: 'Lote',         accessorKey: 'batch',           format: 'number', },
    { header: 'Cupon',        accessorKey: 'number',          format: 'number', },
    { header: 'Monto',        accessorKey: 'amount',          format: 'currency',},
    { header: 'F. Pago',      accessorKey: 'payment_date',
      cell: (info) => dayjs(info.getValue()).format('DD/MM'), format: 'date',   },
    { header: 'Casos',        accessorKey: 'meetings',        format: 'number', className: 'meeting',
      meta:   { filterVariant: 'select', },
    },
    { header: 'Id2',          accessorKey: 'idMeeting',        format: 'text',  className: 'meeting',
      cell: ({ row }) => row.original.idMeeting ? row.original.idMeeting.slice(-5) : '',    },
    { header: 'Error',        accessorKey: 'error',           format: 'number', className: 'meeting'},
  ] 
  const [selectedValue1, setSelectedValue1] = useState({});

  // configuracion tabla 02 ------------
  const endpoint2 = 'api/files/02/';
  const columns2 = [
    {
      header: 'ID',           accessorKey: '_id',             format: 'text',
      cell: ({ row }) => row.original._id ? row.original._id.slice(-5) : '',    },
    { header: 'Bandera',      accessorKey: 'flag',            format: 'text',   },
    { header: 'F. Origen',    accessorKey: 'origin_date',
      cell: (info) => dayjs(info.getValue()).format('DD/MM'), format: 'date',   },
    { header: 'Lote',         accessorKey: 'batch',           format: 'number', },
    { header: 'Cupon',        accessorKey: 'number',          format: 'number', },
    { header: 'Monto',        accessorKey: 'amount',          format: 'currency',},
    { header: 'Cliente',      accessorKey: 'client',          format: 'text',   },
    { header: 'Casos',        accessorKey: 'meetings',        format: 'number', className: 'meeting',},
    { header: 'Id2',          accessorKey: 'idMeeting',        format: 'text',  className: 'meeting',
      cell: ({ row }) => row.original.idMeeting ? row.original.idMeeting.slice(-5) : '',    },
    { header: 'Error',        accessorKey: 'error',           format: 'number', className: 'meeting',},
  ]
  const [selectedValue2, setSelectedValue2] = useState({}); 

  // configura posibles valores tomados para filtrar ------------
  const {getValuesLimited} = useTableSimple(["flag", "origin_date", "batch", "number", "amount"])

  const logcell1 = async (row, column) => await setSelectedValue1(getValuesLimited(row, column))
  const logcell2 = async (row, column) => await setSelectedValue2(getValuesLimited(row, column))

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
          <Table01Init endpoint={endpoint1} columns={columns1} handleCellClick={logcell1} selectedValue={selectedValue2} filter={filter01} refresh={refresh}/>
        </div>
        <div>
          <h2 className='title-table'>Tabla 02 - cupones</h2>
          <Table01Init endpoint={endpoint2} columns={columns2} handleCellClick={logcell2} selectedValue={selectedValue1} filter={filter02} refresh={refresh}/>
        </div>
      </div>
    </div>
  )
}

export default Compare01