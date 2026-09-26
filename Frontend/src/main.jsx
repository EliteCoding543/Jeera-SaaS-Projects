import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Store  from './utlis/Redux/Store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </Provider>
)
