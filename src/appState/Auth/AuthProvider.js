import React from 'react'

import axios from 'axios'
import PropTypes from 'prop-types'

import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState({
    userName: null,
    token: null
  })

  const signIn = (userCredentials, errorCB, callback) => {
    return axios.post().then(
      () => {
        setUser(userCredentials)
        callback()
      }
    ).catch(() => {
      errorCB()
    })
  }

  const signOut = (callback) => {
    return axios.post('').then(
      () => {
        callback()
      }
    ).catch()
  }

  const value = { user, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.element
}
