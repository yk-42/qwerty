import React from 'react'

export const SnackbarContext = React.createContext({
  triggerSnackbar: () => {},
  snackbarState: { open: false, message: '' }
})
