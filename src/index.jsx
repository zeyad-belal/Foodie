import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'
import Store from "./store/index"
import {Provider} from  "react-redux"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <App />
    </Provider>
  </React.StrictMode>
)
