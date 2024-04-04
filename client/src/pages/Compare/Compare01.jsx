import dayjs from 'dayjs';
import InitiateTableSimple from '../../Component/Tables/InitiateTableSimple';
import './compare.scss';
import useTableSimple from '../../Component/Tables/hooks/useTableSimple';
import { useEffect, useState } from 'react';

const Compare01 = () => {
  // configuracion tabla 01
  const endpoint1 = 'api/files/01/';
  const columns1 = [
    { header: 'ID',           accessorKey: '_id',             format: 'text',   hidden: true,  },
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
  ] 
  const allowedFilterColumns01 = ["flag", "origin_date", "batch", "numnber", "amount"]
  const [selectedValue1, setSelectedValue1] = useState({});

  // configuracion tabla 02
  const endpoint2 = 'api/files/02/';
  const columns2 = [
    {
      header: 'ID',           accessorKey: '_id',             format: 'text',   hidden: true,    },
    { header: 'Bandera',      accessorKey: 'flag',            format: 'text',   },
    { header: 'F. Origen',    accessorKey: 'origin_date',
      cell: (info) => dayjs(info.getValue()).format('DD/MM'), format: 'date',   },
    { header: 'Lote',         accessorKey: 'batch',           format: 'number', },
    { header: 'Cupon',        accessorKey: 'number',          format: 'number', },
    { header: 'Monto',        accessorKey: 'amount',          format: 'currency',},
    { header: 'Cliente',      accessorKey: 'client',          format: 'text',   },
  ]
  const allowedFilterColumns02 = ["flag", "origin_date", "batch", "numnber", "amount"]
  const [selectedValue2, setSelectedValue2] = useState({}); 

  // configura posibles valores tomados para filtrar
  const {getValuesLimited} = useTableSimple(["flag", "origin_date", "batch", "numnber", "amount"])

  const logcell1 = async (row, column) => await setSelectedValue1(getValuesLimited(row, column))
  const logcell2 = async (row, column) => await setSelectedValue2(getValuesLimited(row, column))

  // useEffect(() => {
  //   console.log("table1: ",selectedValue1);
  //   console.log("table2: ",selectedValue2);
  // }, [selectedValue1, selectedValue2])

  return (
    <div>
      <h1 className='title'>Comparacion</h1>
      <div className='tables-container'>
        <div>
          <h2 className='title-table'>Tabla 01 - tarjeta</h2>
          <InitiateTableSimple endpoint={endpoint1} columns={columns1} handleCellClick={logcell1} selectedValue={selectedValue2} allowedColumns={allowedFilterColumns01}/>
        </div>
        <div>
          <h2 className='title-table'>Tabla 02 - cupones</h2>
          <InitiateTableSimple endpoint={endpoint2} columns={columns2} handleCellClick={logcell2} selectedValue={selectedValue1} allowedColumns={allowedFilterColumns02}/>
        </div>
      </div>
    </div>
  )
}

export default Compare01