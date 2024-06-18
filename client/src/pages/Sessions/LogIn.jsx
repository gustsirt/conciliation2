import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useFetchService from "../../hooks/useFetchService.jsx";
import { ContextUser } from '../../Context/ContextUsers.jsx';
import "./useraccess.scss"
import { toast } from "react-toastify";

const LogIn = () => {
  const [error, setError] = useState("")
  const { postData } = useFetchService()
  // const { messageAndRedirect } = useSwalAlert()
  const { setToken } = useContext(ContextUser)
  
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: 'prueba@gmail.com',
      password: '12345'
    },
  });
  
  const onSubmit = async data => {
    toast('Prueba')
    // try {
    //   const resp = await postData("api/sessions/login", data)
    //   console.log(resp);
    //   if(resp?.isError === false) {
    //     const token = resp.payload.token;
    //     setToken(`Bearer ${token}`)
    //     // messageAndRedirect(resp.message, "success", "/products/")
    //   } else {
    //     // messageAndRedirect("Acceso no autorizado", "error")
    //   }
    // } catch (error) {
    //   // messageAndRedirect("Acceso no autorizado por un error en el sistema", "error")
    // }
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