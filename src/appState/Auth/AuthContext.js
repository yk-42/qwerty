import React from 'react'

export const AuthContext = React.createContext({
  userName: null,
  userEmail: null,
  token: null
})
