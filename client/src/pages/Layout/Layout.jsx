import { Link, Outlet } from 'react-router-dom';
import './layout.scss'

import LayoutNav from './LayoutNav.jsx';
import LayoutFooter from './LayoutFooter.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  // https://fkhadra.github.io/react-toastify/introduction
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
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