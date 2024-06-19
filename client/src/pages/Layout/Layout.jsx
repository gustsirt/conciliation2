import { Link, Outlet } from 'react-router-dom';
import './layout.scss'

import LayoutNav from './LayoutNav.jsx';
import LayoutFooter from './LayoutFooter.jsx';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  // https://fkhadra.github.io/react-toastify/introduction
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        transition= {Bounce}
      />
      <header className="header">
        <Link to="/">
          <img className="drop-shadow" src="./img/Logotipado.png" alt="Logotipo" />
        </Link>
        <LayoutNav/>
      </header>
      <main className="main">
          <Outlet />
      </main>
      <LayoutFooter/>
    </>
  )
}

export default Layout