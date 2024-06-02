import { createContext, useEffect, useState } from 'react'

export const ContextFiles = createContext()

const localfilter01 = JSON.parse(localStorage.getItem('filter01')) || {}
const localfilter02 = JSON.parse(localStorage.getItem('filter02')) || {}

const FilesProvider = ({children}) => {
  const [backendFilter01 , setBackendFilter01] = useState(localfilter01)
  const [backendFilter02 , setBackendFilter02] = useState(localfilter02)

  useEffect(() => {localStorage.setItem('filter01', JSON.stringify(backendFilter01)) }, [backendFilter01])
  useEffect(() => {localStorage.setItem('filter02', JSON.stringify(backendFilter02)) }, [backendFilter02])

  return (
    <ContextFiles.Provider value={{ backendFilter01, setBackendFilter01, backendFilter02, setBackendFilter02 }}>
      {children}
    </ContextFiles.Provider>
  )
}

export default FilesProvider