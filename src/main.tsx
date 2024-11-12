import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import AppLayout from '@/components/layout'
import { ThemeProvider } from './components/theme-provider'
import { MapTextGenerator } from './pages/map-text-generator'
import { Home } from './pages/home'
import { BlueprintDecoder } from './pages/blueprint-decoder'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AppLayout>
          <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/misc/map-text-gen' Component={MapTextGenerator}/>
            <Route path='/misc/bpdecode' Component={BlueprintDecoder}/>
          </Routes>
        </AppLayout>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
