export const routeNames = {
  LANDING: 'Landing',
  AUTH: 'Auth',
  SIGN_IN: 'Sign-in',
  SIGN_UP: 'Sign-up',
  GALLERY: 'Gallery',
  PHOTO_LIST: 'Photo List',
  PHOTO_PREVIEW: 'Photo Preview',
  MY_SPACE: 'My space',
  HOME: 'Home',
  ERROR: 'Error'
}
export const routePaths = {
  LANDING: '/',
  AUTH: '/auth',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  GALLERY: '/gallery',
  PHOTO_LIST: '/gallery',
  PHOTO_PREVIEW: (id) => `/gallery/pic/${id}`,
  MY_SPACE: '/home/my-space',
  HOME: '/home',
  ERROR: '*'
}
