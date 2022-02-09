import PropTypes from 'prop-types'

import React from 'react'

import { GalleryProvider } from '../appState/gallery/GalleryProvider'
import { DefaultLayout } from './DefaultLayout'

export function GalleryLayout({ children }) {
  return (
    <DefaultLayout>
      <GalleryProvider>{children}</GalleryProvider>
    </DefaultLayout>
  )
}
GalleryLayout.propTypes = { children: PropTypes.element }
