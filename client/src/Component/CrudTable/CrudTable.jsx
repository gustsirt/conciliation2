import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./CrudStyle.scss";
import dayjs from 'dayjs';
import useFetchService from '../../hooks/useFetchService';
import { ContextConfig } from '../../Context/ContextConfig';

const CrudTable = ({ selectedValue, setSelectedValue, apiEndpoint, dataSchema }) => {
  const {setRefresh} = useContext(ContextConfig)
  const { register, handleSubmit, reset, watch, getValues } = useForm();
  const [fileData, setFileData] = useState({})
  const watchId = watch('_id')
  const { postData, putData, deleteData } = useFetchService();
  const [error, setError] = useState(null);

  const maptypes = {
    String: 'text',
    Number: 'number',
    Date:   'date',
    Boolean:'text',
  }

  useEffect(() => {
    if (selectedValue) {
      setFileData(selectedValue)
      const formattedFile = { ...selectedValue };
      Object.keys(dataSchema).forEach(key => {
        if (maptypes[dataSchema[key].type]  === 'date' && formattedFile[key]) {
          formattedFile[key] = dayjs(formattedFile[key]).format('YYYY-MM-DD');
        }
      });
      reset(formattedFile);
    } else {
      const initialValues = Object.keys(dataSchema).reduce((acc, key) => {
        acc[key] = maptypes[dataSchema[key].type]  === 'date' ? '' : '';
        return acc;
      }, {});
      reset(initialValues);
    }
  }, [selectedValue, reset, dataSchema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFileData({ ...fileData, [name]: value });
  };
  
  const onSubmit = async (data) => {
    const transformedData = { ...data };
    Object.keys(dataSchema).forEach(key => {
      if (maptypes[dataSchema[key].type] === 'date' && transformedData[key]) {
        transformedData[key] = dayjs(transformedData[key]).toISOString();
      }
    });

    if (!data._id) { // Lógica para eaviar --> CREATE
      delete transformedData._id;
      delete transformedData.atCreated;
      delete transformedData.lastupdate;
      delete transformedData.userupdate;
      delete transformedData.__v;

      try {
        const response = await postData(apiEndpoint, transformedData);
        if (!response.isError) {
          handleReset()
          setRefresh(prev => !prev)
        } else {
          setError(`Error al enviar el dato. ${response.data}`);
          setTimeout(() => { setError('') }, 3000);
        }
      } catch (error) {
        setError(`Se ha producido un error. ${error.message}`);
        setTimeout(() => { setError('') }, 3000);
      }
    } else { // Lógica para actualizar --> UPDATE
      transformedData.lastupdate = dayjs().toISOString();

      try {
        const response = await putData(`${apiEndpoint}${transformedData._id}`, transformedData);
        if (!response.isError) {
          handleReset();
          setRefresh(prev => !prev);
        } else {
          setError(`Error al actualizar el dato. ${response.data}`);
          setTimeout(() => { setError(''); }, 3000);
        }
      } catch (error) {
        setError(`Se ha producido un error. ${error.message}`);
        setTimeout(() => { setError(''); }, 3000);
      }
    }
  };

  const handleCleanId = () => {
    const showData = { ...selectedValue, _id: '', atCreated: '', lastupdate: '', userupdate: '' };
    setFileData({...showData})
    const formattedFile = showData;
    Object.keys(dataSchema).forEach(key => {
      if (maptypes[dataSchema[key].type]  === 'date' && formattedFile[key]) {
        formattedFile[key] = dayjs(formattedFile[key]).format('YYYY-MM-DD');
      }
    });
    reset(formattedFile);
  }

  const handleDelete = async (data) => {
    if (!data._id) {
      setError('No se selecciono valor a eliminar') 
      setTimeout(() => { setError('') }, 3000);
    } else {
      try {
        const response = await deleteData(`${apiEndpoint}${data._id}`);
        // console.log(response);
        if (!response.isError) {
          handleReset()
          setRefresh(prev => !prev)
        } else {
          setError(`Error al eliminar el dato. ${response.data}`);
          setTimeout(() => { setError('') }, 3000);
        }
      } catch (error) {
        setError(`Se ha producido un error. ${error.message}`);
        setTimeout(() => { setError('') }, 3000);
      }

    }
  }

  const handleReset = () => {
    setSelectedValue(null);
    const initialValues = Object.keys(dataSchema).reduce((acc, key) => {
      acc[key] = maptypes[dataSchema[key].type] === 'date' ? '' : '';
      return acc;
    }, {});
    reset(initialValues);
  };

  return (
    <form className='crud-form' onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(dataSchema).map((key) => (
        <div key={key}>
          <label>{dataSchema[key].label}</label>
          {dataSchema[key].enum ? (
            <select {...register(key, { required: dataSchema[key].required || false })}
              onChange={handleChange}
            >
              {dataSchema[key].enum.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              {...register(key, {
                required: dataSchema[key].required || false,
                pattern: dataSchema[key].pattern || null,
              })}
              onChange={handleChange}
              placeholder={dataSchema[key].label}
              type={maptypes[dataSchema[key].type]}
              disabled={dataSchema[key].disabled}
            />
          )}
          <p className='comentarios'>{dataSchema[key].comments}</p>
        </div>
      ))}
      <div className='buttons'>
        <button type="submit">{ watchId? "Actualizar" : "Enviar"}</button>
        <button type="button" onClick={handleCleanId}>Duplicar</button>
        <button type="button" onClick={()=>handleDelete(getValues())}>Eliminar</button>
        <button type="button" onClick={handleReset}>Limpiar</button>
      </div>
        { error ? <p>Error: {error}</p> : null}
    </form>
  );
};

export default CrudTable;
