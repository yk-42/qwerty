import { Box, Grid, Typography } from '@mui/material'

import React from 'react'

import { FileUploader } from '../../components/my-space/FileUploader'

export function MySpace() {
  return (
    <Grid
      container
      spacing={1}
      py={3}
      justifyContent="center"
      alignItems="center"
      minHeight={'75vh'}
    >
      <Box
        sx={{
          position: 'relative',
          width: '600px',
          margin: 'auto'
        }}
      >
        <Box my={'20px'}>
          <Typography variant="h6">Video Uploader</Typography>
        </Box>

        <FileUploader />
      </Box>
    </Grid>
  )
}
