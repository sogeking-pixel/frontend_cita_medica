import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//todo hacer que al regitrarse, ahi mismo mostrar el cuardo de envio de email de verificación
//todo en el login, caso que el usuario no esté verificado, mostrar el cuadro de verificación
//todo en olvidar contraseña, si el usuario no está verificado, mostrar el cuadro de verificación

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
