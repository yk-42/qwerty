import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'

import { AuthProvider } from './appState/Auth/AuthProvider'
import { appRoutes } from './routes'
import { RenderRouteUtil } from './routes/RouteRenderUtil'
import { theme } from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>{appRoutes.map(RenderRouteUtil)}</Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
