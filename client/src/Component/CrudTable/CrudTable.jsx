import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./CrudStyle.scss";
import dayjs from 'dayjs';

const CrudTable = ({ selectedValue, setSelectedValue, onFormSubmit, dataSchema }) => {
  const { register, handleSubmit, reset } = useForm();
  const [fileData, setFileData] = useState({})

  const maptypes = {
    String: 'text',
    Number: 'number',
    Date:   'date',
    Boolean:'text',
  }

  useEffect(() => {
    //console.log(selectedValue);
    console.log(dataSchema);
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
    //console.log(fileData);
  };
  
  const onSubmit = (data) => {
    console.log(data);
    // onFormSubmit(data);
  };

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
        <button type="submit">Enviar</button>
        <button type="button" onClick={handleReset}>Duplicar</button>
        <button type="button" onClick={handleReset}>Limpiar</button>
      </div>
    </form>
  );
};

export default CrudTable;
