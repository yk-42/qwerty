import React from 'react'
import { SignIn } from '../pages/auth/SignIn'
import { SignUp } from '../pages/auth/SignUp'
import { PhotoList } from '../pages/gallery/PhotoList'
import { PhotoPreview } from '../pages/gallery/PhotoPreview'
import { Landing } from '../pages/home/Landing'
import { ErrorPage } from '../pages/security/ErrorPage'

export const appRoutes = [
  {
    path: '/',
    name: 'Landing',
    exact: true,
    element: <Landing />
  },
  {
    path: '/auth',
    name: 'Auth',
    nestedRoutes: [
      {
        name: 'Sign-in',
        path: 'sign-in',
        element: <SignIn />
      },
      {
        name: 'Sign-up',
        path: 'sign-up',
        element: <SignUp />
      }
    ]
  },
  {
    path: '/gallery',
    name: 'Gallery',
    nestedRoutes: [
      {
        name: 'Photo List',
        path: '',
        element: <PhotoList />
      },
      {
        name: 'Photo Preview',
        path: 'pic/:id',
        component: <PhotoPreview />
      }
    ]
  },
  {
    path: '/my-space',
    name: 'My space',
    nestedRoutes: [
      {
        name: 'Home',
        path: '',
        private: true
      }
    ]
  },
  {
    path: '*',
    name: 'Error',
    element: <ErrorPage />
  }
]
