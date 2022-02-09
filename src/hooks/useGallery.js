import React from 'react'

import { GalleryContext } from '../appState/gallery/GalleryContext'

export function useGallery() {
  return React.useContext(GalleryContext)
}
