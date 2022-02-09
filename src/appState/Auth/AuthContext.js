import React from 'react'

export const AuthContext = React.createContext({
  user: {
    userEmail: null,
    userFirstName: null,
    userLastName: null,
    token: null
  },
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  isAuth: () => null
})
