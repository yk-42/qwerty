import axios from 'axios'
import PropTypes from 'prop-types'

import React from 'react'

import { GalleryContext } from './GalleryContext'

const DEFAULT_GALLERY_STORE = {
  pictures: [],
  currentIndex: null
}

export function GalleryProvider({ children }) {
  const [galleryStore, setGalleryStore] = React.useState({
    ...DEFAULT_GALLERY_STORE
  })

  const loadAllData = (errorCB, callBack) => {
    return axios
      .get('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then((data) => {
        if (data?.data) {
          setGalleryStore((galleryStore) => ({
            ...galleryStore,
            pictures: data?.data,
            currentIndex: 0
          }))
          callBack(data?.data)
        } else {
          errorCB()
        }
      })
      .catch(() => {
        errorCB()
      })
  }
  const getNext = () => {
    let _next = null
    if (
      galleryStore.pictures.length &&
      galleryStore.currentIndex + 1 < galleryStore.pictures.length
    ) {
      _next = galleryStore.currentIndex + 1
    }

    return _next ? galleryStore.pictures[_next] : null
  }

  const getPrevious = () => {
    let _prev = null
    if (galleryStore.pictures.length && galleryStore.currentIndex > 0) {
      _prev = galleryStore.currentIndex - 1
    }

    return _prev ? galleryStore.pictures[_prev] : null
  }

  const getCurrent = () => {
    if (galleryStore.pictures.length && galleryStore.currentIndex) {
      return galleryStore.pictures[galleryStore.currentIndex]
    }
    return null
  }

  const loadCurrent = ({ photoId }, errorCB, callBack) => {
    console.log('hi')
    const _current = getCurrent()
    if (_current) {
      callBack(_current)
    }
    return axios
      .get('https://jsonplaceholder.typicode.com/photos/' + photoId)
      .then((data) => {
        if (data?.data) {
          callBack(data?.data)
        } else {
          errorCB()
        }
        return data?.data
      })
      .then(() => {
        const _allDataCallBack = (_all) => {
          const currentItemIndex = _all.findIndex(
            (e) => e.id === Number(photoId)
          )
          setGalleryStore((gs) => ({ ...gs, currentIndex: currentItemIndex }))
        }
        loadAllData(() => {}, _allDataCallBack)
      })
  }

  const value = {
    galleryStore,
    loadAllData,
    getNext,
    getPrevious,
    getCurrent,
    loadCurrent
  }

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  )
}

GalleryProvider.propTypes = {
  children: PropTypes.element
}
