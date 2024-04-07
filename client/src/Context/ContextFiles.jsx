import { createContext, useEffect, useState } from 'react'

export const ContextFiles = createContext()

const localfilter01 = JSON.parse(localStorage.getItem('filter01')) || {}
const localfilter02 = JSON.parse(localStorage.getItem('filter02')) || {}

const FilesProvider = ({children}) => {
  const [filter01 , setFilter01] = useState(localfilter01)
  const [filter02 , setFilter02] = useState(localfilter02)

  useEffect(() => {localStorage.setItem('filter01', JSON.stringify(filter01)) }, [filter01])
  useEffect(() => {localStorage.setItem('filter02', JSON.stringify(filter01)) }, [filter02])

  return (
    <ContextFiles.Provider value={{ filter01, setFilter01, filter02, setFilter02 }}>
      {children}
    </ContextFiles.Provider>
  )
}

export default FilesProvider