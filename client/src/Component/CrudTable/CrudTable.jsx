import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CrudTable = ({ selectedValue, onFormSubmit, columns }) => {
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
  },[])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {columns.map((column) => (
        <div key={column.accessorKey}>
          <label>{column.header}</label>
          <input
            {...register(column.accessorKey)}
            placeholder={column.header}
            type={column.format === 'date' ? 'date' : column.format === 'number' ? 'number' : 'text'}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CrudTable;
