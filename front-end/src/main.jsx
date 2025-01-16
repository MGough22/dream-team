import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from '/src/components/ui/provider'
import {BrowserRouter} from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import { UserIdProvider } from './contexts/UserIdContext.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <StrictMode>
   <Provider>
    <UserIdProvider>
    <UserProvider>
    <App />
    </UserProvider>
    </UserIdProvider>
    </Provider>
  </StrictMode>
</BrowserRouter>
  
)
