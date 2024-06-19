import { useContext, useEffect } from 'react';
import { ContextUser } from '../../Context/ContextUsers.jsx';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(ContextUser);
  
  useEffect(() => {
    setToken(null);
    localStorage.removeItem('token');
    toast.success("Has cerrado sessión")
    setTimeout( () => { navigate("/", { replace: true }) }, 2000 )
  }, []);

  return null;
}

export default Logout;
