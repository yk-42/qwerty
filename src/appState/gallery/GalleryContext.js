import React from 'react'

export const GalleryContext = React.createContext({
  galleryStore: { pictures: [], currentIndex: null },
  loadAllData() {},
  getNext() {},
  getPrevious() {},
  getCurrent() {},
  loadCurrent() {}
})
