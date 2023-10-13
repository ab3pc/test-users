import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store/store"

import { ConfigProvider, theme } from "antd"
import { App } from "./components/app"

import "./index.css"
import { Toast } from "./components/toast/toast"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <App />
        <Toast />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
