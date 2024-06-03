import { createContext, useState } from 'react'

export const ContextConfig = createContext()

const ConfigProvider = ({children}) => {
  const [baseUrl , setBaseUrl] = useState(import.meta.env.VITE_BACKEND_URL)

  return (
    <ContextConfig.Provider value={{ baseUrl, setBaseUrl }}>
      {children}
    </ContextConfig.Provider>
  )
}

export default ConfigProvider