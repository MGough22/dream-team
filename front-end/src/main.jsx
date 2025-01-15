import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from '../src/components/ui/provider'
import {BrowserRouter} from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <StrictMode>
   <Provider>
    <UserProvider>
    <App />
    </UserProvider>
    </Provider>
  </StrictMode>
</BrowserRouter>
  
)
