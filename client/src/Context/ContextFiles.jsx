import { createContext, useState } from 'react'

export const ContextFiles = createContext()

const FilesProvider = ({children}) => {
  const [filter01 , setFilter01] = useState({})
  const [filter02 , setFilter02] = useState({})

  return (
    <ContextFiles.Provider value={{ filter01, setFilter01, filter02, setFilter02 }}>
      {children}
    </ContextFiles.Provider>
  )
}

export default FilesProvider