import { useContext, useState } from 'react';
import { ContextConfig } from '../../Context/ContextConfig.jsx';
import './FileUpload.scss';

const FileUpload = ({endpoint, onDataUploaded}) => {
  const { baseUrl } = useContext(ContextConfig);

  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  //api/files/01/fromFile/
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        body: formData
      });
      
      setLoading(false);
      if (!response.ok) {
        throw new Error('Error al conectar al servidor');
      }

      if (response.status == 204) {
        throw new Error('No ha encontrado elementos para cargar');
      }

      onDataUploaded()
      setAlert('Archivo subido con éxito')
      setTimeout(()=>{ setAlert("") },10000)

    } catch (error) {
      setAlert('Error al subir el archivo:'+ error)
      setTimeout(()=>{ setAlert("") },10000)
    }
  };

  return (
    <div className={'fileUpload '+(loading ? 'loading-cursor' : '')}>
      <h2>Subir Archivo</h2>
      <form onSubmit={handleSubmit} className={loading ? 'loading-cursor' : ''}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Subir</button>
      </form>
      {loading && <p className='red-alert'>Cargando archivo...</p>}
      <p className='red-alert'>{alert}</p>
    </div>
  );
};

export default FileUpload;
