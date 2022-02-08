import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import { purple } from '@mui/material/colors'
import PropTypes from 'prop-types'

import React from 'react'

export function DefaultLayout({ children }) {
  console.log(children)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }} />
          <Button color="inherit">Login</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <>
        <Box
          sx={{
            padding: 10,
            bgcolor: purple[50]
          }}
          height="75vh"
        >
          Hi
          {children}
        </Box>
      </>
    </Box>
  )
}

DefaultLayout.propTypes = { children: PropTypes.element }
