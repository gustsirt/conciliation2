import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { useContext } from 'react';
import { ContextUser } from '../../Context/ContextUsers';
import useToast from '../../hooks/useToast';
import useFetchTokenService from '../../hooks/useFetchTokenService';

const LayoutNav = () => {
  const { user, setUser, token, setToken } = useContext(ContextUser)
  const { fetchTData } = useFetchTokenService()
  const { toastSucess, toastError } = useToast()

  const [isPublic, setIsPublic] = useState(!user)
  const [navItems, setNavItems] = useState([
    {
      path: "/",
      label: "Inicio",
    },
    {
      path: "table01/",
      label: "Table01",
    },
    {
      path: "table02/",
      label: "Table02",
    },
    {
      path: "compare01/",
      label: "Compare",
    },
    {
      path: "summary/",
      label: "Resumen",
    },
    {
      path: "clients/",
      label: "Clientes",
      visibleFor: {
        user: true,
      }
    },
    {
      path: "refcolores/",
      label: "Colores a Usar",
    }
  ])


  useEffect( () => {
    const getUser = async () => {
      try {
        const resp = await fetchTData('api/users/current')
        if (resp?.isError === false) {

          setUser(resp.data);
        } else {
          throw new Error()
        }
      } catch (error) {
        setToken(null);
        localStorage.removeItem('token');
        toast.error("Error de usuario")
      }
    }
    if (token) {
      getUser()
    } else {
      setUser(null);
    }
  }, [token])
  
  return (
    <nav className="nav">
      <ul>
        {navItems.map((item) => {
          const showItem = 
            (isPublic && (item.visibleFor === undefined || item.onlyPublic === true)) ||
            (!isPublic && (item.onlyPublic === undefined || item.visibleFor !== undefined));
          return showItem ? (
            <li key={item.path}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          ) : null;
        })}
      </ul>
      { user && (
        <div className="user-widget">
          <div className="user-area">
            <div>
              <NavLink to="user/">{user.first_name}</NavLink>
              <NavLink to="logout/"><BiLogOut/></NavLink>
            </div>
            <p>Rol: {user.role}</p>
          </div>
        </div>)}
    </nav>
  )
}

export default LayoutNav