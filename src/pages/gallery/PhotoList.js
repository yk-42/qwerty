import { HideImage } from '@mui/icons-material'
import { Box, Grid, Skeleton, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'

import React from 'react'

import { PhotoCard } from '../../components/gallery/PhotoCard'
import { useGallery } from '../../hooks/useGallery'

export function PhotoList() {
  const [albumPhotos, setAlbumPhotos] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const { loadAllData } = useGallery()
  React.useEffect(() => {
    const errorCB = () => setError(true)
    const callBack = (data) => setAlbumPhotos(data || [])
    setLoading(true)
    loadAllData(errorCB, callBack).finally(() => setLoading(false))

    return () => {}
  }, [])

  return (
    <Grid
      container
      spacing={1}
      py={3}
      justifyContent="center"
      alignItems="center"
      minHeight={'75vh'}
    >
      {loading ? (
        Array(60)
          .fill(null)
          .map((_, ix) => (
            <Grid item key={ix} xs={6} md={1}>
              <Skeleton variant="rectangular" width={150} height={150} />
            </Grid>
          ))
      ) : error ? (
        <Box width={500} flex textAlign={'center'}>
          <HideImage sx={{ fontSize: '20rem', color: grey[500] }} />
          <Typography>
            {"Technical issue occured! We couldn't retrieve any image 😥"}
          </Typography>
        </Box>
      ) : (
        albumPhotos.map((e, i) => (
          <Grid item key={i} xs={6} md={1}>
            <PhotoCard {...e} />
          </Grid>
        ))
      )}
    </Grid>
  )
}
