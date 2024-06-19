import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useFetchService from "../../hooks/useFetchService.jsx";
import { ContextUser } from '../../Context/ContextUsers.jsx';
import "./useraccess.scss"
import { toast } from "react-toastify";

const LogIn = () => {
  const navigate = useNavigate();
  const { postData } = useFetchService()
  const { setToken } = useContext(ContextUser)
  
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: 'prueba@gmail.com',
      password: '12345'
    },
  });
  
  const onSubmit = async data => {
    try {
      const resp = await postData("api/users/login", data)
      console.log(resp);
      if(resp?.isError === false) {
        const token = resp.data.token;
        setToken(`Bearer ${token}`)
        toast.success("Te has logueado con exito!")
        setTimeout( () => { navigate("/table01/", { replace: true }) }, 2000 )
      } else {
        toast.error("Acceso no autorizado")
      }
    } catch (error) {
      console.log(error);
      toast.error("Acceso no autorizado por un error en el sistema")
    }
  };

  return (
    <div  className="page-container">
      <h1 className="title">Inicio de Sesión</h1>
      <form className="form-container-vert" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">   Email</label>
        <input type="email" {...register("email",    { required: true})} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" {...register("password", { required: true})} />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default LogIn