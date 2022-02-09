import React from 'react'

import { LikedListContext } from '../appState/likedList/LikedListContext'

export function useLikedList() {
  return React.useContext(LikedListContext)
}
