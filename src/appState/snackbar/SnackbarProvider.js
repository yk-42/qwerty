import { CloseOutlined } from '@mui/icons-material'
import { IconButton, Snackbar } from '@mui/material'
import PropTypes from 'prop-types'

import React from 'react'

import { SnackbarContext } from './SnackbarContext'

const DEFAULT_SNACKBAR_STATE = {
  open: false,
  message: ''
}

export function SnackbarProvider({ children }) {
  const [snackbarState, setSnackbarState] = React.useState({
    ...DEFAULT_SNACKBAR_STATE
  })

  const triggerSnackbar = (message) => {
    setSnackbarState({
      open: true,
      message
    })
  }

  const closeSnackbar = () => {
    setSnackbarState((sb) => ({ ...sb, open: false }))
  }

  const value = {
    snackbarState,
    triggerSnackbar
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarState.open}
        message={snackbarState.message}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackbar}
          >
            <CloseOutlined fontSize="small" />
          </IconButton>
        }
      />
    </SnackbarContext.Provider>
  )
}

SnackbarProvider.propTypes = {
  children: PropTypes.element
}
