import React from 'react'

import { DefaultLayout } from '../layout/DefaultLayout'
import { LandingLayout } from '../layout/LandingLayout'
import { SignIn } from '../pages/auth/SignIn'
import { SignUp } from '../pages/auth/SignUp'
import { PhotoList } from '../pages/gallery/PhotoList'
import { PhotoPreview } from '../pages/gallery/PhotoPreview'
import { Landing } from '../pages/home/Landing'
import { MySpace } from '../pages/my-space/MySpace'
import { ErrorPage } from '../pages/security/ErrorPage'

export const appRoutes = [
  {
    path: '/',
    name: 'Landing',
    exact: true,
    element: (
      <LandingLayout>
        <Landing />
      </LandingLayout>
    )
  },
  {
    path: '/auth',
    name: 'Auth',
    nestedRoutes: [
      {
        name: 'Sign-in',
        path: 'sign-in',
        element: (
          <LandingLayout>
            <SignIn />
          </LandingLayout>
        )
      },
      {
        name: 'Sign-up',
        path: 'sign-up',
        element: (
          <LandingLayout>
            <SignUp />
          </LandingLayout>
        )
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
        element: (
          <DefaultLayout>
            <PhotoList />
          </DefaultLayout>
        )
      },
      {
        name: 'Photo Preview',
        path: 'pic/:id',
        element: (
          <DefaultLayout>
            <PhotoPreview />
          </DefaultLayout>
        )
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    nestedRoutes: [
      {
        name: 'My Space',
        path: 'my-space',
        element: (
          <DefaultLayout>
            <MySpace />
          </DefaultLayout>
        ),
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
