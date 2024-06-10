import { useEffect } from "react";
import useFetchService from "../../hooks/useFetchService";
import { useForm } from 'react-hook-form';

const CrudForm = () => {
  //const { loading, fetchData, postData, putData, deleteData } = useFetchService();
  const {register, handleSubmit, reset } = useForm({})

  useEffect(() => {
    if (selectedFile) {
      reset(selectedFile);
    } else {
      reset({
        service: '',
        business_number: '',
        flag: '',
        origin_date: '',
        batch: '',
        number: '',
        amount: '',
        payment_date: '',
      });
    }
  }, [selectedFile, reset]);

  const onSubmit = (data) => {
    onFormSubmit(data);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="service" ref={register} placeholder="Servicio" />
      <input name="business_number" ref={register} placeholder="N Com" />
      <input name="flag" ref={register} placeholder="Bandera" />
      <input name="origin_date" ref={register} placeholder="F. Origen" type="date" />
      <input name="batch" ref={register} placeholder="Lote" type="number" />
      <input name="number" ref={register} placeholder="Cupon" type="number" />
      <input name="amount" ref={register} placeholder="Monto" type="number" />
      <input name="payment_date" ref={register} placeholder="F. Pago" type="date" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CrudForm