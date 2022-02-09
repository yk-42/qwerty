import { ContentCopy } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'

import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { useSnackBar } from '../../hooks/useSnackbar'
import { routePaths } from '../../routes/route-tools'

export function PhotoCard({ albumId, id, title, url, thumbnailUrl }) {
  const [visibleOverlay, setVisibleOverlay] = React.useState(false)
  const { triggerSnackbar } = useSnackBar()
  const handleExpandClick = () => {
    setVisibleOverlay(!visibleOverlay)
  }
  const navigte = useNavigate()

  const openPhotoPreview = () => {
    navigte(routePaths.PHOTO_PREVIEW(id))
  }

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.host + routePaths.PHOTO_PREVIEW(id))
      .then(() => {
        triggerSnackbar(`Successfully copied Photo #${id}`)
      })
  }
  return (
    <Card
      onMouseEnter={handleExpandClick}
      onMouseLeave={handleExpandClick}
      sx={{ cursor: 'pointer' }}
    >
      <Box sx={{ position: 'relative' }}>
        {visibleOverlay && (
          <CardHeader
            sx={{
              position: 'absolute',
              right: 0
            }}
            action={
              <>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon color="inherit" />
                </IconButton>
                <IconButton aria-label="share" onClick={copyLink}>
                  <ContentCopy />
                </IconButton>
              </>
            }
          />
        )}
        <CardMedia
          onClick={openPhotoPreview}
          component="img"
          image={thumbnailUrl || url}
          alt={albumId || id || title || 'awesome-photo'}
        />
      </Box>
    </Card>
  )
}

PhotoCard.propTypes = {
  albumId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  thumbnailUrl: PropTypes.string
}
