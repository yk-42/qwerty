import { Button, Grid, Stack, Typography } from '@mui/material'

import React from 'react'
import { Link } from 'react-router-dom'

import landingPicture from '../../assets/img/landing/landing.png'

export function Landing() {
  return (
    <Grid
      container
      spacing={0}
      height={'100vh'}
      alignContent="center"
      justifyContent={'center'}
    >
      <Grid
        item
        container
        xs={12}
        md={6}
        alignContent="center"
        justifyContent={'center'}
        spacing={4}
      >
        <Grid item xs={8}>
          <Typography my={4} variant="h1" fontWeight={'900'} color="primary">
            Welcome to your Awesome online gallery
          </Typography>
          <Typography variant="h4" fontWeight={'900'}>
            📷Where you can post &amp; share all your media 📸
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignContent="center"
          justifyContent={'center'}
        >
          <Stack spacing={2} direction="row">
            <Button LinkComponent={Link} to="/gallery" variant="contained">
              Go to Gallery
            </Button>
            <Button LinkComponent={Link} to="/my-space/" variant="outlined">
              Upload your Video
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5} flexWrap="wrap">
        <img src={landingPicture} alt={'landing picture'} width={'100%'} />
      </Grid>
    </Grid>
  )
}
