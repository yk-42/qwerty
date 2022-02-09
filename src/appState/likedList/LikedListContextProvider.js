import PropTypes from 'prop-types'

import React from 'react'

import { LikedListContext } from './LikedListContext'

export function LikedListContextProvider({ children }) {
  const [likedList, setLikedList] = React.useState([])

  React.useEffect(() => {
    const llLS = localStorage.getItem('liked-list')
    if (llLS) {
      setLikedList(JSON.parse(llLS))
    }
  }, [])

  const isLiked = (photoId) => {
    return likedList.includes(photoId)
  }
  const triggerLike = (photoId) => {
    const newLL = likedList.includes(photoId)
      ? likedList.filter((pid) => pid !== photoId)
      : likedList.concat(photoId)
    localStorage.setItem('liked-list', JSON.stringify(newLL))
    setLikedList(newLL)
  }

  const value = {
    likedList,
    isLiked,
    triggerLike
  }

  return (
    <LikedListContext.Provider value={value}>
      {children}
    </LikedListContext.Provider>
  )
}

LikedListContextProvider.propTypes = {
  children: PropTypes.element
}
