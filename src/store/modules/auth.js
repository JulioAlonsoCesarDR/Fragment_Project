import {
  createUser,
  signIn,
  appUser
} from '../../utils/api'

export const PERSISTENCE_SESSION = 'PERSISTENCE_SESSION'
export const SET_SESSION = 'SET_SESSION'

export const NEW_USER_REQUEST = 'NEW_USER_REQUEST'
export const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS'
export const NEW_USER_ERROR = 'NEW_USER_ERROR'

export const LOGOUT_REQUEST = 'LOGOUTREQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'

const state = {
  status: '',
  response: '',
  token: '',
  client: '',
  uid: ''
}

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  userData: state => state.response
}

const actions = {
  [PERSISTENCE_SESSION]: ({
    commit,
    dispatch
  }) => {
    return new Promise((resolve, reject) => {
      const uid = window.localStorage.getItem('uid') || ''
      const token = window.localStorage.getItem('access-token') || ''
      const client = window.localStorage.getItem('client')
      const data = {
        token,
        client,
        uid
      }
      if (token && client && uid) {
        appUser().then(res => {
          window.localStorage.setItem('access-token', token)
          window.localStorage.setItem('client', client)
          window.localStorage.setItem('uid', uid)
          commit(SET_SESSION, res, data)
          resolve(res)
        })
      }
    })
  },
  [NEW_USER_REQUEST]: ({
    commit,
    dispatch
  }, data) => {
    return new Promise((resolve, reject) => {
      commit(NEW_USER_REQUEST)
      createUser(data)
        .then(res => {
          const token = res.headers['access-token']
          const client = res.headers.client
          const uid = res.headers.uid

          window.localStorage.setItem('access-token', token)
          window.localStorage.setItem('client', client)
          window.localStorage.setItem('uid', uid)

          commit(NEW_USER_SUCCESS, res)
          resolve(res)
        })
        .catch(err => {
          commit(NEW_USER_ERROR, err)
          window.localStorage.removeItem('access-token')
          window.localStorage.removeItem('client')
          window.localStorage.removeItem('uid')
          reject(err)
        })
    })
  },

  [LOGOUT_REQUEST]: ({
    commit,
    dispatch
  }, data) => {
    return new Promise((resolve, reject) => {
      commit(LOGOUT_REQUEST)
      window.localStorage.clear()
      resolve()
    })
  },

  [SIGN_IN_REQUEST]: ({
    commit,
    dispatch
  }, data) => {
    return new Promise((resolve, reject) => {
      commit(SIGN_IN_REQUEST)
      signIn(data)
        .then(res => {
          commit(SIGN_IN_SUCCESS, res)
          resolve(res)
          const token = res.headers['access-token']
          const client = res.headers.client
          const uid = res.headers.uid
          window.localStorage.setItem('access-token', token)
          window.localStorage.setItem('client', client)
          window.localStorage.setItem('uid', uid)
          appUser().then(res => {
            console.log(res)
            debugger
          })
        })
        .catch(err => {
          commit(SIGN_IN_ERROR, err)
          window.localStorage.removeItem('access-token')
          window.localStorage.removeItem('client')
          window.localStorage.removeItem('uid')
          reject(err)
        })
    })
  }
}

const mutations = {
  [NEW_USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [NEW_USER_SUCCESS]: (state, res) => {
    state.status = 'success'
    state.token = res.headers['access-token']
    state.client = res.headers.client
    state.uid = res.headers.uid
    state.response = res.data
  },
  [LOGOUT_REQUEST]: (state) => {
    state.status = ''
    state.token = ''
    state.client = ''
    state.uid = ''
  },
  [SIGN_IN_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [SIGN_IN_SUCCESS]: (state, res) => {
    state.status = 'success'
    state.token = res.headers['access-token']
    state.client = res.headers.client
    state.uid = res.headers.uid
    state.response = res.data
  },
  [SIGN_IN_ERROR]: (state) => {
    state.status = 'error'
  },
  [SET_SESSION]: (state, res, data) => {
    state.status = 'success'
    state.response = res.data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
