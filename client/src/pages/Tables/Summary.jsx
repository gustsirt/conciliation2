import { useState } from "react"
import TableInit from "../../Component/Tables/TableInit"
import dayjs from "dayjs"

const Summary = () => {
  const [backendFilter01, setBackendFilter01 ] = useState({})

  // BackEnd Configuration
  const backend = {
    endpoint: 'api/files/01/summary',
    endpointfilter: 'api/files/01/',
    filter: backendFilter01,
    setFilter: setBackendFilter01,
    allowedFilters: ['service', 'flag', 'business_number', 'payment_month'],
    refresh: 0
  }
  // Table Especifications
  const tableOptions = {
    allow: {
      paginated: true,
      summary: 'totalAmount',
    },
    columns: [
      {
        header: 'Servicio',
        accessorKey: '_id.service',
        id: 'service',
        format: 'text',
      },
      {
        header: 'N Com',
        accessorKey: '_id.business_number',
        id: 'business_number',
        format: 'text',
      },
      {
        header: 'Bandera',
        accessorKey: '_id.flag',
        id: 'flag',
        format: 'text',
      },
      {
        Header: 'Mes de Pago',
        accessor: '_id.payment_month',
        id: 'payment_month',
        format: 'number',
      },
      {
        header: 'F. Pago',
        accessorKey: '_id.payment_date',
        id: 'payment_date',
        cell: (info) => dayjs(info.getValue()).format('DD/MM'),
        format: 'date',
      },
      {
        header: 'Monto',
        accessorKey: 'totalAmount',
        id: 'totalAmount',
        cell: (cel) => new Intl.NumberFormat('es-ES').format(cel.getValue()),
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
