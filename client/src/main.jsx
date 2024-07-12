import ReactDOM from 'react-dom/client'
import './styles/index.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContextProvider from './Context/ContextProvider.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>  
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>}/>
    </ContextProvider>
  </QueryClientProvider>
)
