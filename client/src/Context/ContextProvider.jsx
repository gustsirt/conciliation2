import ConfigProvider from "./ContextConfig.jsx"
import UserProvider from "./ContextUsers.jsx"
import FilesProvider from "./ContextFiles.jsx"

const ContextProvider = ({children}) => {
  return (
    <ConfigProvider>
      <UserProvider>
        <FilesProvider>
          {children}
        </FilesProvider>
      </UserProvider>
    </ConfigProvider>
  )
}

export default ContextProvider