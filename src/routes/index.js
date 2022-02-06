export const appRoutes = [
  {
    route: '/',
    name: 'Landing'
  },
  {
    route: '/auth',
    name: 'Auth',
    children: [
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
    children: [
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
    children: [
      {
        name: 'Home',
        route: '/',
        private: true
      }
    ]
  }
]
