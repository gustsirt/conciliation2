import { Navigate, createHashRouter } from 'react-router-dom';


import Layout from './pages/Layout/Layout.jsx';
import Home from './pages/Home.jsx';
import ErrorPage from './pages/Error/Error.jsx';
import Table01 from './pages/Table01.jsx';
import Colores from './pages/temporal/Colores.jsx';

const router = createHashRouter([
  // createBrowserRouter reemplazaria --> createHashRouter (se pone hash para que lo tome github pages)
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage/>,
    children: [ 
      { index: true, element: <Home />},
      { path: 'table01/', element: <Table01 />},
      { path: 'refcolores/', element: <Colores /> }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

export default router