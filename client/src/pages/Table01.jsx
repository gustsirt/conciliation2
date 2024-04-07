import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import FileUpload from '../Component/Tables/FileUpload';
import InitiateTableSimple from '../Component/Tables/InitiateTableSimple';
import { ContextFiles } from '../Context/ContextFiles.jsx';

const Table01 = () => {
  const [ forceRefresh, setForceRefresh ] = useState(false);
  const { filter01, setFilter01 } = useContext(ContextFiles)
  const filters01 = ['service', 'flag', 'business_number', 'payment_month']

  const endpoint = 'api/files/01/';
  const columns = [
    {
      header: 'ID',
      accessorKey: '_id',
      format: 'text',
      hidden: true,
    },
    { 
      header: 'Servicio',
      accessorKey: 'service',
      format: 'text',
    },
    {
      header: 'N Com',
      accessorKey: 'business_number',
      format: 'text',
    },
    {
      header: 'Bandera',
      accessorKey: 'flag',
      format: 'text',
    },
    {
      header: 'F. Origen',
      accessorKey: 'origin_date',
      cell: (info) => dayjs(info.getValue()).format('DD/MM'),
      format: 'date',
    },
    {
      header: 'Lote',
      accessorKey: 'batch',
      format: 'number',
    },
    {
      header: 'Cupon',
      accessorKey: 'number',
      format: 'number',
    },
    {
      header: 'Monto',
      accessorKey: 'amount',
      format: 'currency',
    },
    {
      header: 'F. Pago',
      accessorKey: 'payment_date',
      cell: (info) => dayjs(info.getValue()).format('DD/MM'),
      format: 'date',
    },
  ] 

  const handleDataRefresh = () => {
    setForceRefresh(!forceRefresh);
  };

  return (
    <div>
      <h1 className='title'>Tabla01: Tarjeta</h1>
      <InitiateTableSimple endpoint={endpoint} columns={columns} selectedValue={{value: ""}} filters={filters01} filter={filter01} setFilter={setFilter01}/>

      <FileUpload endpoint={"api/files/01/fromfile/"} onDataUploaded={handleDataRefresh}/>
    </div>
  )
}

export default Table01