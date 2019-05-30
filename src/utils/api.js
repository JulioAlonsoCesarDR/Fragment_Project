import axios from 'axios'

const dev = process.env.NODE_ENV === 'development'
console.log(dev)

let headers = {}

headers['access-token'] = window.localStorage.getItem('access-token')
headers['client'] = window.localStorage.getItem('client')
headers['uid'] = window.localStorage.getItem('uid')

const _axios = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 30000,
  headers: headers
})

export const createUser = data => {
  return _axios
    .post('auth', data)
    .then(response => response)
}

export const signIn = data => {
  return _axios
    .post('auth/sign_in', data)
    .then(response => response)
}
export const appUser = data => {
  return _axios
    .get('app_users/my_profile/')
    .then(response => response)
}
