import React from 'react'

import PropTypes from 'prop-types'
import {
  Navigate,
  useLocation
} from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

export function RequireAuth({ children }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.element
}
