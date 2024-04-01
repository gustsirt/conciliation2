import { createContext, useState } from 'react'

export const ContextConfig = createContext()

const ConfigProvider = ({children}) => {
  const [baseUrl , setBaseUrl] = useState('http://localhost:8080')

  return (
    <ContextConfig.Provider value={{ baseUrl, setBaseUrl }}>
      {children}
    </ContextConfig.Provider>
  )
}

export default ConfigProvider