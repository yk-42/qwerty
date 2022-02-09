import React from 'react'

export const LikedListContext = React.createContext({
  isLiked: () => {},
  triggerLike: () => {},
  likedList: []
})
