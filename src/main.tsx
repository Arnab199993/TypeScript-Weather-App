import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { Provider } from 'react-redux'
import store from './Store/Store.tsx'
import { WeatherQuery } from './Store/WeatherQuery.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <ApiProvider api={WeatherQuery}>
      <App />
    </ApiProvider>
    {/* </Provider> */}
  </React.StrictMode>,
)
