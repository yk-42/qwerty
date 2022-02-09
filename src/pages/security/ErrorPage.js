import { Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/system'
import PropTypes from 'prop-types'

import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { routeNames, routePaths } from '../../routes/route-tools'

const RouterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main
}))

export function ErrorPage({ errorCode, errorMessage }) {
  const { state } = useLocation()
  const theme = useTheme()

  console.log(location)
  return (
    <Grid
      container
      spacing={0}
      height={'100vh'}
      alignContent="center"
      justifyContent={'center'}
    >
      <Grid
        xs={12}
        item
        container
        height={'100vh'}
        alignContent="center"
        justifyContent={'center'}
      >
        <Stack spacing={2} direction="row">
          <Typography>{errorCode || state?.errorCode || '404'}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>
            {!state?.errorMessage && state?.errorCode === '401' ? (
              <>
                Authorization Required! Head to{' '}
                <RouterLink
                  style={{ textDecoration: 'none' }}
                  to={routePaths.SIGN_IN}
                >
                  {routeNames.SIGN_IN}
                </RouterLink>
                {' or '}
                <RouterLink
                  style={{
                    textDecoration: 'none',
                    color: theme.palette?.main?.primary
                  }}
                  to={routePaths.SIGN_IN}
                >
                  {routeNames.SIGN_IN}
                </RouterLink>
              </>
            ) : (
              errorMessage ||
              state?.errorMessage ||
              'This page could not be found'
            )}
          </Typography>
        </Stack>
        <Grid
          xs={12}
          item
          container
          alignContent="center"
          justifyContent={'center'}
        >
          <Stack spacing={2} direction="row">
            <Button LinkComponent={Link} to="/" variant="text">
              Return Home
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  errorMessage: PropTypes.string
}
