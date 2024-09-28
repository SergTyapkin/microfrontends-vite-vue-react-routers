import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App.jsx'
import '../../shared-res/styles/global.styl'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
