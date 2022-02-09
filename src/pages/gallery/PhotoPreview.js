import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  HideImage
} from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/system'

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGallery } from '../../hooks/useGallery'
import { routePaths } from '../../routes/route-tools'

export function PhotoPreview() {
  const [photoData, setPhotoData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const params = useParams()
  const navigte = useNavigate()
  const navigateToPhotoPreview = (id) => {
    navigte(routePaths.PHOTO_PREVIEW(id))
  }
  const { loadCurrent, getNext, getPrevious, galleryStore } = useGallery()
  const errorCB = () => setError(true)
  const callBack = (data) => setPhotoData(data)

  const previousDisableCalc = React.useMemo(
    () => !getPrevious() || loading,
    [galleryStore.currentIndex]
  )
  const nextDisableCalc = React.useMemo(
    () => !getNext() || loading,
    [galleryStore.currentIndex]
  )

  const gotoPreviousImage = () => {
    const _prevImageData = getPrevious()
    if (_prevImageData?.id) {
      navigateToPhotoPreview(_prevImageData?.id)
    }
  }
  const gotoNextImage = () => {
    const _nextImageData = getNext()
    if (_nextImageData?.id) {
      navigateToPhotoPreview(_nextImageData?.id)
    }
  }

  React.useEffect(() => {
    setLoading(true)
    if (params?.id) {
      loadCurrent({ photoId: params?.id }, errorCB, callBack).finally(() =>
        setLoading(false)
      )
    }
    return () => {}
  }, [params])

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Stack
        spacing={2}
        justifyContent="center"
        justifyItems={'center'}
        alignItems="center"
        direction="row"
      >
        <IconButton
          disabled={previousDisableCalc}
          onClick={gotoPreviousImage}
          sx={{ width: '5rem', height: '5rem', fontSize: '4rem' }}
          size="large"
          aria-label="fingerprint"
        >
          <ArrowCircleLeftOutlined fontSize="large" />
        </IconButton>
        {loading ? (
          <Skeleton variant="rectangular" width={600} height={600} />
        ) : error ? (
          <Box width={600} flex textAlign={'center'}>
            <HideImage sx={{ fontSize: '20rem', color: grey[500] }} />
          </Box>
        ) : (
          <img src={photoData?.url} alt={'awesome-photo'} />
        )}
        <IconButton
          disabled={nextDisableCalc}
          onClick={gotoNextImage}
          sx={{ width: '5rem', height: '5rem', fontSize: '4rem' }}
          size="large"
          variant="contained"
        >
          <ArrowCircleRightOutlined fontSize="large" />
        </IconButton>
      </Stack>
    </Box>
  )
}
