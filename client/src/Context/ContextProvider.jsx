import ConfigProvider from "./ContextConfig.jsx"
import FilesProvider from "./ContextFiles.jsx"


const ContextProvider = ({children}) => {
  return (
    <ConfigProvider>
      <FilesProvider>
        {children}
      </FilesProvider>
    </ConfigProvider>
  )
}

export default ContextProvider