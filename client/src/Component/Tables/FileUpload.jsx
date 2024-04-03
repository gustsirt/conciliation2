import { useContext, useState } from 'react';
import { ContextConfig } from '../../Context/ContextConfig.jsx';

const FileUpload = ({endpoint}) => {
  const { baseUrl } = useContext(ContextConfig);

  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState("");

  //api/files/01/fromFile/
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);

      setAlert('Procesando el archivo')
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Error al conectar al servidor');
      }
      console.log(response.status);
      if (response.status == 204) {
        throw new Error('No se ha actualizado ningun archivo');
      }

      setAlert('Archivo subido con éxito')
      setTimeout(()=>{ setAlert("") },4000)

    } catch (error) {
      setAlert('Error al subir el archivo:'+ error)
      setTimeout(()=>{ setAlert("") },4000)
    }
  };

  return (
    <div>
      <h2>Subir Archivo</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Subir</button>
      </form>
      <p className='red-alert'>{alert}</p>
    </div>
  );
};

export default FileUpload;
