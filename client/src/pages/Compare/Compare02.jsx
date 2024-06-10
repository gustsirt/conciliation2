import './compare.scss';
import { useContext } from 'react';
import { ContextFiles } from '../../Context/ContextFiles.jsx';
import useConciliation from '../../hooks/useConciliarion.jsx';
import useTableConfig from '../../Config/useTableConfig.jsx';
import TableComponent from '../../Component/Tables/TableComponent.jsx';

const Compare = () => {
  
  const { backendFilter01, backendFilter02} = useContext(ContextFiles) // se pasa parametro
  const { linking, handleLink, handleClean, marking, unmarking } = useConciliation(backendFilter01, backendFilter02);
  
  const { config, rowSelection1, rowSelection2 } = useTableConfig()
  const table00 = config.compareSummary;
  const table01 = config.compareTable01
  const table02 = config.compareTable02

  // useEffect(()=>{
  //   console.log("tabla 1: ",rowSelection1);
  //   console.log("tabla 2: ",rowSelection2);
  // },[rowSelection1, rowSelection2])

  return (
    <div>
      <h1 className='title'>Comparación</h1>
      <div className='button-actions'>
        { linking
          ? (<p>Procesando info...</p>)
          : (<>
            <button onClick={handleLink}>Linkear Tablas</button>
            <button onClick={handleClean}>Borrar Marcas</button>
            <button onClick={() => marking  (rowSelection1, rowSelection2)}>Mark  </button>
            <button onClick={() => unmarking(rowSelection1, rowSelection2)}>UnMark</button>
          </>)
        }
      </div>
      <div className='tables-container'>
        <div>
          <TableComponent
            title="Resumen Comparativo"
            backendConfig = {table00.backend}
            tableOptions  = {table00.tableOptions}
          />
          <p>- Mejorar apariencia </p>
          <p>- OJO que summary data02 no no filtra los IsClosed</p>
        </div>
        <div>
          <TableComponent
            title="Tabla 01 - tarjeta"
            backendConfig = {table01.backend}
            tableOptions  = {table01.tableOptions}
          />
          <p>- Pensando reemplazar error por diferencia</p>
          <p>- A analizar despues caso 1 fila tarjeta = 2 filas cupon</p>
        </div>
        <div>
          <TableComponent
            title="Tabla 02 - cupones"
            backendConfig = {table02.backend}
            tableOptions  = {table02.tableOptions}
          />
          <p>- Pensando reemplazar error por fecha de pago (segun tarjeta)</p>
          <p>- A analizar despues caso 2 filas tarjeta = 1 fila cupon</p>
        </div>
      </div>
    </div>
  )
}

export default Compare