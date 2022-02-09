import PropTypes from 'prop-types'

import React from 'react'

import { GalleryProvider } from '../appState/gallery/GalleryProvider'
import { LikedListContextProvider } from '../appState/likedList/LikedListContextProvider'
import { SnackbarProvider } from '../appState/snackbar/SnackbarProvider'
import { LandingLayout } from './LandingLayout'

export function GalleryLayout({ children }) {
  return (
    <LandingLayout>
      <GalleryProvider>
        <SnackbarProvider>
          <LikedListContextProvider>{children}</LikedListContextProvider>
        </SnackbarProvider>
      </GalleryProvider>
    </LandingLayout>
  )
}
GalleryLayout.propTypes = { children: PropTypes.element }
