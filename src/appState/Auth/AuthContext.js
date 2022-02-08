import React from 'react'

export const AuthContext = React.createContext({
  user: {
    userName: null,
    userEmail: null,
    token: null
  },
  signIn: () => null,
  signUp: () => null,
  isAuth: () => null
})
