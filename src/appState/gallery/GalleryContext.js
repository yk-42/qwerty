import React from 'react'

export const GalleryContext = React.createContext({
  pictures: [],
  currentIndex: null,
  loadAllData() {},
  getNext() {},
  getPrevious() {},
  getCurrent() {},
  moveNext() {},
  movePrevious() {},
  loadCurrent() {}
})
