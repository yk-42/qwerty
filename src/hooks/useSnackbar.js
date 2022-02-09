import React from 'react'

import { SnackbarContext } from '../appState/snackbar/SnackbarContext'

export function useSnackBar() {
  return React.useContext(SnackbarContext)
}
