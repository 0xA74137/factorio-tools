import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './style/index.css'
import AppLayout from '@/components/layout'
import { ThemeProvider } from './components/theme-provider'
import { MapTextGenerator } from './pages/map-text-generator'
import { Home } from './pages/home'
import { BlueprintDecoder } from './pages/blueprint-decoder'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { AxiosProvider } from './components/axios-provider'

const queryClient = new QueryClient();
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.BASE_URL}`,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <AxiosProvider instance={axiosInstance}>
            <AppLayout>
              <Routes>
                <Route path='/' Component={Home}/>
                <Route path='/misc/map-text-gen' Component={MapTextGenerator}/>
                <Route path='/misc/bpdecode' Component={BlueprintDecoder}/>
              </Routes>
            </AppLayout>
          </AxiosProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
