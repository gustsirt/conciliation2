import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./CrusStyle.scss";
import dayjs from 'dayjs';

const CrudTable = ({ selectedValue, setSelectedValue, onFormSubmit, columns, dataSchema }) => {
  const { register, handleSubmit, reset } = useForm();

  // useEffect(() => {
  //   if (selectedValue) {
  //     reset(selectedValue);
  //   } else {
  //     reset(columns.reduce((acc, column) => {
  //       acc[column.accessorKey] = '';
  //       return acc;
  //     }, {}));
  //   }
  // }, [selectedValue, reset, columns]);

  const onSubmit = (data) => {
    console.log(data);
    // onFormSubmit(data);
  };

  useEffect(() => {
    console.log(selectedValue);
    if (selectedValue) {
      const formattedFile = { ...selectedValue };
      Object.keys(dataSchema).forEach(key => {
        if (dataSchema[key] === 'date' && formattedFile[key]) {
          formattedFile[key] = dayjs(formattedFile[key]).format('YYYY-MM-DD');
        }
      });
      reset(formattedFile);
    } else {
      const initialValues = Object.keys(dataSchema).reduce((acc, key) => {
        acc[key] = dataSchema[key] === 'date' ? '' : '';
        return acc;
      }, {});
      reset(initialValues);
    }
  }, [selectedValue, reset, dataSchema]);

  const handleReset = () => {
    setSelectedValue(null);
    const initialValues = Object.keys(dataSchema).reduce((acc, key) => {
      acc[key] = dataSchema[key] === 'date' ? '' : '';
      return acc;
    }, {});
    reset(initialValues);
  };

  return (
    <form className='crud-form' onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(dataSchema).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            {...register(key, {required: true })}
            placeholder = {key}
            type={dataSchema[key] === 'date' ? 'date' : dataSchema[key] === 'number' ? 'number' : 'text'}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
};

export default CrudTable;
