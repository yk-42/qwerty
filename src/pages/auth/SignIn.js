import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Container, FormHelperText, Stack } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { routePaths } from '../../routes/route-tools'

export function SignIn() {
  const [error, setError] = React.useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    setError(false)
    const data = new FormData(event.currentTarget)
    const userCredentials = {
      email: data.get('email'),
      password: data.get('password')
    }
    const errorCB = () => setError(true)
    const callback = () => {
      navigate(routePaths.GALLERY)
    }
    signIn(userCredentials, errorCB, callback)
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            error={error}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            error={error}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && (
            <FormHelperText error>{'Invalid credentials'}</FormHelperText>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            item
            xs={12}
          >
            <Stack spacing={2}>
              <Button type="submit" variant="contained" mx={2}>
                Sign In
              </Button>
              <Button
                LinkComponent={Link}
                to={routePaths.SIGN_UP}
                variant="text"
              >
                {"Don't have an account? Sign Up"}
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
