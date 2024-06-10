import { createContext, useState } from 'react'

export const ContextConfig = createContext()

const ConfigProvider = ({children}) => {
  const [baseUrl , setBaseUrl] = useState(import.meta.env.VITE_BACKEND_URL)
  const [refresh, setRefresh] = useState(false); // se usa para refrescar tablas

  return (
    <ContextConfig.Provider value={{ baseUrl, setBaseUrl, refresh, setRefresh }}>
      {children}
    </ContextConfig.Provider>
  )
}

export default ConfigProvider