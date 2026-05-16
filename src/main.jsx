import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { SearchProvider } from './context/SearchContext'
import './index.css'
import store from '../app/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <SearchProvider>
            <App />
          </SearchProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
