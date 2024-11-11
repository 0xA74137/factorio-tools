import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppLayout from '@/app/layout.tsx'
import { ThemeProvider } from './components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AppLayout />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
