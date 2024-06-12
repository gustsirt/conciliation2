import React, { useContext, useMemo, useState } from 'react'
import dayjs from 'dayjs';
import { ContextFiles } from '../Context/ContextFiles';
import useTableSimple from '../Component/Tables/hooks/useTableSimple';
import IndeterminateCheckbox from '../Component/Tables/Helper/IndeterminateCheckBox';

const useTableConfig = (tableType) => {

  // Filtros Generales
  const { backendFilter01, setBackendFilter01 } = useContext(ContextFiles);
  const { backendFilter02, setBackendFilter02 } = useContext(ContextFiles);

  // Valores de celda seleccionada
  const [selectedValue1, setSelectedValue1] = useState({}); 
  const [selectedValue2, setSelectedValue2] = useState({});
  const {getValues, getValuesLimited} = useTableSimple(["flag", "origin_date", "batch", "number", "amount"])

  // configura posibles valores tomados para filtrar ------------
  const logcell1 = async (row, column) => setSelectedValue1(getValuesLimited(row, column))
  const logcell2 = async (row, column) => setSelectedValue2(getValuesLimited(row, column))

  const logrow1 = async (row, column) => setSelectedValue1(getValues(row, column))
  const dataSchema01 = {
    service: 'text',
    business_number: 'text',
    flag: 'text',
    type: 'text',
    batch: 'number',
    number: 'number',
    last_4_number: 'number',
    installment: 'number',
    presentation_date: 'date',
    origin_date: 'date',
    payment_date: 'date',
    payment_month: 'number',
    description: 'text',
    amount: 'number',
    sign: 'number',
    atCreated: 'date',
    lastupdate: 'date',
    userupdate: 'text',
  };

  // Filas Seleccionadas
  const [rowSelection1, setRowSelection1] = useState([]);
  const [rowSelection2, setRowSelection2] = useState([]);

  const apiEndpoints = {
    t01: 'api/files/01/',
    t02: 'api/files/02/',
    summary: 'api/link/summary',
  }

  const commonConfig = {
    endpoint: '',
    filter: {},
    setFilter: () => {},
    allowedFilters: [],
    allowedUpload: false,
  };

  const config = {
      table01: {
        backend: {
          ...commonConfig,
          endpoint: apiEndpoints.t01,
          endpointfilter: apiEndpoints.t01,
          filter: backendFilter01,
          setFilter: setBackendFilter01,
          allowedUpload: true,
          allowedFilters: ['service', 'flag', 'business_number', 'payment_month'],
        },
        tableOptions: {
          allow: {
            paginated: true,
            selectClick: true,
          },
          handleCellClick: logrow1,
          columns: [
            { header: 'ID',        accessorKey: '_id',             format: 'text',
              cell: ({ row }) => (row.original._id ? row.original._id.slice(-5) : ''), },
            { header: 'Servicio',  accessorKey: 'service',         format: 'text',     },
            { header: 'N Com',     accessorKey: 'business_number', format: 'text',     },
            { header: 'Bandera',   accessorKey: 'flag',            format: 'text',     },
            { header: 'F. Origen', accessorKey: 'origin_date',     format: 'date',
              cell: (info) => dayjs(info.getValue()).format('DD/MM'),                  },
            { header: 'Lote',      accessorKey: 'batch',           format: 'number',   },
            { header: 'Cupon',     accessorKey: 'number',          format: 'number',   },
            { header: 'Monto',     accessorKey: 'amount',          format: 'currency', },
            { header: 'F. Pago',   accessorKey: 'payment_date',    format: 'date',
              cell: (info) => dayjs(info.getValue()).format('DD/MM'),                  },
          ],
        },
        crud: {
          selectedValue: selectedValue1,
          setSelectedValue: setSelectedValue1,
          dataSchema: dataSchema01
        }
      },
      table02: {
        backend: {
          ...commonConfig,
          endpoint: apiEndpoints.t02,
          endpointfilter: apiEndpoints.t02,
          filter: backendFilter02,
          setFilter: () => setBackendFilter02,
          allowedUpload: true,
          allowedFilters: ['flag'],
        },
        tableOptions: {
          allow: {
            paginated: true
          },
          columns: [
            { header: 'ID',        accessorKey: '_id',             format: 'text',
              cell: ({ row }) => (row.original._id ? row.original._id.slice(-5) : ''), },
            { header: 'Bandera',   accessorKey: 'flag',            format: 'text',     },
            { header: 'F. Origen', accessorKey: 'origin_date',     format: 'date',
              cell: (info) => dayjs(info.getValue()).format('DD/MM'),                  },
            { header: 'Lote',      accessorKey: 'batch',           format: 'number',   },
            { header: 'Cupon',     accessorKey: 'number',          format: 'number',   },
            { header: 'Monto',     accessorKey: 'amount',          format: 'currency', },
            { header: 'Cliente',   accessorKey: 'client',          format: 'text',     },
          ],
        },
      },
      compareSummary: {
        backend: {
          ...commonConfig,
          endpoint: apiEndpoints.summary,
          filter: backendFilter01,
        },
        tableOptions: {
          allow: {
            paginated: true,
            sort: true,
            especialSummary: true,
          },
          columns: [
            { header: 'F. Pago',   accessorKey: 'payment_date',    format: 'date',
              cell: (info) => dayjs(info.getValue()).format('DD/MM'),                  },
            { header: 'Tarjeta',   accessorKey: 'totalData01',     format: 'currency',
              cell: (cel) => new Intl.NumberFormat('es-ES').format(cel.getValue()),    },
            { header: 'Cupones',   accessorKey: 'totalData02',     format: 'currency',
              cell: (cel) => new Intl.NumberFormat('es-ES').format(cel.getValue()),    },
            { header: 'Diferencia',
              accessorFn: (row)=>row.totalData01-row.totalData02,
              cell: (cel) => new Intl.NumberFormat('es-ES').format(cel.getValue()),    },
          ]
        }
      },
      compareTable01: {
        backend: {
          ...commonConfig,
          endpoint: apiEndpoints.t01,
          filter: backendFilter01,
        },
        tableOptions: {
          allow: {
            paginated: true,
            sort: true,
            globalFilter: true, selectClick: true,
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
      },
      compareTable02: {
        backend: {
          ...commonConfig,
          endpoint: apiEndpoints.t02,
          filter: backendFilter02,
        },
        tableOptions: {
          allow: {
            paginated: true,
            sort: true,
            globalFilter: true, selectClick: true,
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
      },
  }
  return {config, rowSelection1, rowSelection2}
}

export default useTableConfig

// Auxiliar de Columnas
const displayPaymentDate = (paymentDate) => {
  if (!paymentDate) { return ""; }
  const date = dayjs(paymentDate);
  return date.isValid() ? date.format('DD/MM') : "";
};