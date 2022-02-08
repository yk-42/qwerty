import PropTypes from 'prop-types'

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

export function RequireAuth({ children }) {
  const { isAuth } = useAuth()
  const location = useLocation()
  console.log({ isAuth, location, children })
  if (!isAuth()) {
    return (
      <Navigate
        to="/401"
        state={{
          from: location,
          errorCode: '401',
          errorMessage: 'Authorization Required.'
        }}
        replace
      />
    )
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.element
}
