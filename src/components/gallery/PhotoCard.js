import { ContentCopy } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'

import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { useLikedList } from '../../hooks/useLikedList'
import { useSnackBar } from '../../hooks/useSnackbar'
import { routePaths } from '../../routes/route-tools'

export function PhotoCard({ albumId, id, title, url, thumbnailUrl }) {
  const [visibleOverlay, setVisibleOverlay] = React.useState(false)
  const { likedList, triggerLike } = useLikedList()

  const { triggerSnackbar } = useSnackBar()

  const isPhotoLiked = React.useMemo(() => likedList.includes(id), [likedList])

  const handleExpandClick = () => {
    setVisibleOverlay(!visibleOverlay)
  }
  const navigate = useNavigate()

  const openPhotoPreview = () => {
    navigate(routePaths.PHOTO_PREVIEW(id))
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
        {(isPhotoLiked || visibleOverlay) && (
          <CardHeader
            sx={{
              position: 'absolute',
              right: 0
            }}
            action={
              <>
                {visibleOverlay && (
                  <IconButton aria-label="share" onClick={copyLink}>
                    <ContentCopy />
                  </IconButton>
                )}
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => triggerLike(id)}
                >
                  <FavoriteIcon color={isPhotoLiked ? 'primary' : 'inherit'} />
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
