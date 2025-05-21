import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.jsx'
// import SplineRocket from './custom/SplineRocket.jsx/index.js'
// import SplineRocket from "./custom/SplineRocket.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App  />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
