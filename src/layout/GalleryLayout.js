import PropTypes from 'prop-types'

import React from 'react'

import { GalleryProvider } from '../appState/gallery/GalleryProvider'
import { SnackbarProvider } from '../appState/snackbar/SnackbarProvider'
import { DefaultLayout } from './DefaultLayout'

export function GalleryLayout({ children }) {
  return (
    <DefaultLayout>
      <GalleryProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </GalleryProvider>
    </DefaultLayout>
  )
}
GalleryLayout.propTypes = { children: PropTypes.element }
