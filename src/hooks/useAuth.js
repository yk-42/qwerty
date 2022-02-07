import React from 'react'

import { AuthContext } from '../appState/Auth/AuthContext'

export function useAuth () {
  return React.useContext(AuthContext)
}
