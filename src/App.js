import React from 'react'

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import { appRoutes } from './routes'
import { RenderRouteUtil } from './routes/RouteRenderUtil';
import { AuthProvider } from './appState/Auth/AuthProvider';

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {appRoutes.map(RenderRouteUtil)}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
}
