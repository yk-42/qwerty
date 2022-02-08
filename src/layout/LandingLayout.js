import { Stack } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import PropTypes from 'prop-types'

import React from 'react'
import { Link } from 'react-router-dom'

import { routePaths } from '../routes/route-tools'

export function LandingLayout({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" elevation={0}>
        <Toolbar>
          <Button
            LinkComponent={Link}
            to={routePaths.LANDING}
            variant="text"
            sx={{ color: 'white' }}
          >
            Resourceful Humans Technical Test
          </Button>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            flexGrow={1}
            spacing={1}
          >
            <Button
              LinkComponent={Link}
              to={routePaths.SIGN_UP}
              variant="contained"
              color="secondary"
            >
              Sign-up
            </Button>
            <Button
              LinkComponent={Link}
              to={routePaths.SIGN_IN}
              variant="contained"
              color="secondary"
              mx={3}
            >
              Sign-in
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  )
}

LandingLayout.propTypes = { children: PropTypes.element }
