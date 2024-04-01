import ReactDOM from 'react-dom/client'
import './styles/index.scss';

import { RouterProvider } from 'react-router-dom';
import router from './router.jsx'
import ContextProvider from './Context/ContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>}/>
  </ContextProvider>
)
