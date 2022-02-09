import PropTypes from 'prop-types'

import React from 'react'

import {
  signInPromised,
  signOutPromised,
  signUpPromised
} from '../../api/fake-auth'
import { persistIntoLocalStorage } from '../../helpers/persistence'
import { AuthContext } from './AuthContext'

const DEFAULT_USER_OBJECT = {
  userEmail: null,
  userFirstName: null,
  userLastName: null,
  token: null
}
export function AuthProvider({ children }) {
  const [user, setUser] = React.useState({
    ...DEFAULT_USER_OBJECT
  })

  React.useEffect(() => {
    const localStorageUserCredentials = localStorage.getItem('user-credentials')
    let parsedUserCredentials = null
    try {
      parsedUserCredentials = JSON.parse(localStorageUserCredentials)
    } catch {
      parsedUserCredentials = null
    }
    if (parsedUserCredentials) {
      setUser(parsedUserCredentials)
    }
  }, [])

  const signUp = (userCredentials, errorCB, callback) => {
    return signUpPromised(userCredentials)
      .then((_uc) => {
        persistIntoLocalStorage('user-credentials', _uc)
        setUser(_uc)
        callback(_uc)
      })
      .catch(() => {
        errorCB()
      })
  }
  const signIn = (userCredentials, errorCB, callback) => {
    console.log({ userCredentials, errorCB, callback })
    return signInPromised(userCredentials)
      .then((_uc) => {
        console.log(_uc)
        persistIntoLocalStorage('user-credentials', _uc)
        setUser(_uc)
        callback(_uc)
      })
      .catch(() => {
        console.log('aaa')
        errorCB()
      })
  }

  const signOut = (callback) => {
    return signOutPromised().then(() => {
      persistIntoLocalStorage('user-credentials', {})
      setUser({
        ...DEFAULT_USER_OBJECT
      })
      callback && callback()
    })
  }

  const isAuth = () =>
    user.userEmail && user.userFirstName && user.userLastName && user.token
  const value = { user, signIn, signOut, signUp, isAuth }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.element
}
