import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./CrudStyle.scss";
import dayjs from 'dayjs';

const CrudTable = ({ selectedValue, setSelectedValue, onFormSubmit, columns, dataSchema }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // onFormSubmit(data);
  };

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
          <input
            {...register(key, {
              required: dataSchema[key].required || false
            })}
            placeholder = {key}
            type={maptypes[dataSchema[key].type]} //|| 'text'
          />
          <p className='comentarios'>{dataSchema[key].comments}</p>
        </div>
      ))}
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
};

export default CrudTable;
