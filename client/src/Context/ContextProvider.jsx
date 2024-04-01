import ConfigProvider from "./ContextConfig.jsx"


const ContextProvider = ({children}) => {
  return (
    <ConfigProvider>

        {children}

    </ConfigProvider>
  )
}

export default ContextProvider