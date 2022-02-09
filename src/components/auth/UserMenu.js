import AccountCircle from '@mui/icons-material/AccountCircle'
import { Divider, IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { routePaths } from '../../routes/route-tools'

export function UserMenu() {
  const [menuAnchor, setMenuAnchor] = React.useState(null)
  const _navigate = useNavigate()
  const { signOut } = useAuth()
  const handleMenu = (event) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchor(null)
  }
  const logout = () => {
    handleClose()
    signOut().then(() => {
      _navigate('/')
    })
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(menuAnchor)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={routePaths.MY_SPACE}
          >
            My Space
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={routePaths.PHOTO_LIST}
          >
            My account
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>Log-out</MenuItem>
      </Menu>
    </>
  )
}
