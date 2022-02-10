import PropTypes from 'prop-types'

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

export function RequireAuth({ children }) {
  const { isAuth, user } = useAuth()
  const location = useLocation()
  const isAuthorized = React.useMemo(() => isAuth(), [user])
  if (!isAuthorized) {
    return (
      <Navigate
        to="/401"
        state={{
          from: location,
          errorCode: '401'
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
