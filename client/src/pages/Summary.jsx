import { useState } from "react"
import TableInit from "../Component/Tables/TableInit"
import dayjs from "dayjs"

const Summary = () => {
  const [backendFilter01, setBackendFilter01 ] = useState({})

  // BackEnd Configuration
  const backend = {
    endpoint: 'api/files/01/summary/visa/3',
    filter: backendFilter01,
    setFilter: setBackendFilter01,
    //allowedFilters: ['flag', 'payment_month'],
    // allowedFilters: ['service', 'flag', 'business_number', 'payment_month'],
    refresh: 0
  }
  // Table Especifications
  const tableOptions = {
    allow: {
      paginated: true
    },
    columns: [
      // {
      //   header: 'Servicio',
      //   accessorKey: 'service',
      //   format: 'text',
      // },
      // {
      //   header: 'N Com',
      //   accessorKey: 'business_number',
      //   format: 'text',
      // },
      // {
      //   header: 'Bandera',
      //   accessorKey: 'flag',
      //   format: 'text',
      // },
      {
        header: 'F. Pago',
        accessorKey: '_id', //'payment_date',
        cell: (info) => dayjs(info.getValue()).format('DD/MM'),
        format: 'date',
      },
      {
        header: 'Monto',
        accessorKey: 'totalAmount', //'amount',
        format: 'currency',
      },
    ]
  }

  return (
    <div className="page-container">
      <h1>Resumen</h1>
      <TableInit
        backend = {backend}
        tableOptions = {tableOptions}
      />
    </div>)
}

export default Summary
