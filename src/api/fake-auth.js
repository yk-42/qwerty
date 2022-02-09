/* eslint-disable camelcase */
const init_backend = () => {
  const db = localStorage.getItem('dummy-backend')
  const fakeData = {
    _b_firstName: 'admin',
    _b_lastName: 'admin',
    _b_email: 'admin',
    _b_password: 'admin'
  }
  if (!db) {
    localStorage.setItem('dummy-backend', JSON.stringify(fakeData))
  }
}

init_backend()
const DUMMY_BACKEND_USER_DATA = JSON.parse(
  localStorage.getItem('dummy-backend')
)

export const signInPromised = ({ email, password }) => {
  console.log({ email, password })
  return new Promise((resolve, reject) => {
    const { _b_firstName, _b_lastName, _b_email, _b_password } =
      DUMMY_BACKEND_USER_DATA
    if (
      (!_b_email && password === '0000') ||
      (_b_email === email && _b_password === password)
    ) {
      return setTimeout(() => {
        return resolve({
          userEmail: email,
          userFirstName: _b_firstName,
          userLastName: _b_lastName,
          token: 'MY_VERY_CONFIDENTIAL_TOKEN'
        })
      }, Math.random() * 2000)
    } else {
      reject(Error('Invalid Credentials'))
    }
  })
}

export const signUpPromised = ({ firstName, lastName, email, password }) =>
  new Promise((resolve, reject) => {
    if (!(firstName && lastName && email && password)) {
      reject(Error('Missing user data!'))
    }
    setTimeout(() => {
      localStorage.setItem(
        'dummy-backend',
        JSON.stringify({
          _b_firstName: firstName,
          _b_lastName: lastName,
          _b_email: email,
          _b_password: password
        })
      )
      resolve({
        userEmail: email,
        userFirstName: firstName,
        userLastName: lastName,
        token: 'MY_VERY_CONFIDENTIAL_TOKEN'
      })
    }, Math.random() * 2000)
  })

export const signOutPromised = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        done: true
      })
    }, Math.random() * 2000)
  })
