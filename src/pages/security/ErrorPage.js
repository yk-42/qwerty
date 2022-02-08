import { Button, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

import React from 'react'
import { useLocation } from 'react-router-dom'

// import './index.css'

// <div className="error-container">
//   <div>
//     <h1 className="error-code">{errorCode || state?.errorCode || '404'}</h1>
//     <div className="error-text-container">
//       <h2 className="error-text">
//         {errorMessage ||
//           state?.errorMessage ||
//           'This page could not be found'}
//       </h2>
//     </div>
//   </div>
//   <div>Go back to africa</div>
// </div>
export function ErrorPage({ errorCode, errorMessage }) {
  const { state } = useLocation()
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
            {errorMessage ||
              state?.errorMessage ||
              'This page could not be found'}
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
            <Button link href="/" variant="text">
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
