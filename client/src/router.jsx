import { Navigate, createHashRouter } from 'react-router-dom';

import Layout from './pages/Layout/Layout.jsx';
// import Home from './pages/Home.jsx';
import LogIn from './pages/Sessions/LogIn.jsx';
import Register from './pages/Sessions/Register.jsx';
import Logout from './pages/Sessions/LogOut.jsx';
import ErrorPage from './pages/Error/Error.jsx';
import Table01 from './pages/Tables/Table01.jsx';
import Table02 from './pages/Tables/Table02.jsx';
import Compare from './pages/Compare/Compare02.jsx';
import Summary from './pages/Tables/Summary.jsx';
import Colores from './pages/temporal/Colores.jsx';

const router = createHashRouter([
  // createBrowserRouter reemplazaria --> createHashRouter (se pone hash para que lo tome github pages)
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage/>,
    children: [ 
      { index: true, element: <LogIn />},
      { path: 'register/', element: <Register />},
      { path: 'logout/', element: <Logout />},
      { path: 'table01/', element: <Table01 />},
      { path: 'table02/', element: <Table02 />},
      { path: 'compare01/', element: <Compare />},
      { path: 'summary/', element: <Summary />},
      { path: 'refcolores/', element: <Colores /> }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

export default router