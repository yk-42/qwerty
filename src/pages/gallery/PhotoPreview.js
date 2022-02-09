import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  HideImage
} from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/system'
import axios from 'axios'

import React from 'react'
import { useParams } from 'react-router-dom'

export function PhotoPreview() {
  const [photoData, setPhotoData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const params = useParams()
  React.useEffect(() => {
    setLoading(true)
    axios
      .get('https://jsonplaceholder.typicode.com/photos/' + params?.id)
      .then((data) => {
        if (data?.data) {
          setPhotoData(data?.data)
        } else {
          setError(true)
        }
        setLoading(false)
      })
      .catch(() => {
        setError(true)
      })

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
          disabled={loading}
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
          disabled={loading}
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
