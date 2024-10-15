import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/assets/app.css'
import ModeProvider from './Contexts/DarkModeContext.jsx'
import UserProvider from './Contexts/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ModeProvider>
  </StrictMode>,
)
