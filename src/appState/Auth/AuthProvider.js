import axios from 'axios'
import PropTypes from 'prop-types'

import React from 'react'

import { AuthContext } from './AuthContext'

const DEFAULT_USER_OBJECT = { userName: null, userEmail: null, token: null }
export function AuthProvider({ children }) {
  const [user, setUser] = React.useState({
    userName: null,
    userEmail: null,
    token: null
  })

  const signIn = (userCredentials, errorCB, callback) => {
    return axios
      .post()
      .then((data) => {
        setUser({ ...userCredentials, ...data })
        callback()
      })
      .catch(() => {
        errorCB()
      })
  }

  const signOut = (callback) => {
    return axios
      .post('')
      .then(() => {
        setUser({
          ...DEFAULT_USER_OBJECT
        })
        callback()
      })
      .catch()
  }

  const isAuth = () => user.token && user.userEmail && user.userName
  const value = { user, signIn, signOut, isAuth }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.element
}
