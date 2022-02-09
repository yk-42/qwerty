import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Container, FormHelperText, Stack } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { routePaths } from '../../routes/route-tools'

export function SignUp() {
  const [error, setError] = React.useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    setError(false)
    const data = new FormData(event.currentTarget)
    const userCredentials = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    }
    const errorCB = () => setError(true)
    const callback = () => {
      navigate(routePaths.GALLERY)
    }
    signUp(userCredentials, errorCB, callback)
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              {error && (
                <FormHelperText sx={{ pb: 3 }} error>
                  {'Invalid/Missing new Account data!'}
                </FormHelperText>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            item
            xs={12}
          >
            <Stack spacing={2}>
              <Button type="submit" fullWidth variant="contained" my={2}>
                Sign Up
              </Button>
              <Button
                LinkComponent={Link}
                to={routePaths.SIGN_IN}
                variant="text"
              >
                {'Already have an account? Sign in'}
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
