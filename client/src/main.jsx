import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Ensure dark mode is always enabled
document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
          <main className='purple-dark text-foreground' style={{ background: 'transparent' }}>
            <App />
          </main>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)