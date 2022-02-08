import React from 'react'
import { ErrorPage } from '../pages/security/ErrorPage'

export const appRoutes = [
  {
    route: '/',
    name: 'Landing',
    exact: true
  },
  {
    route: '/auth',
    name: 'Auth',
    nestedRoutes: [
      {
        name: 'Sign-in',
        route: '/sign-in'
      },
      {
        name: 'Sign-up',
        route: '/sign-up'
      }
    ]
  },
  {
    route: '/gallery',
    name: 'Gallery',
    nestedRoutes: [
      {
        name: 'Home',
        route: '/'
      },
      {
        name: 'Picture Preview',
        route: '/pic/:id'
      }
    ]
  },
  {
    route: '/my-space',
    name: 'My space',
    nestedRoutes: [
      {
        name: 'Home',
        route: '/',
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
