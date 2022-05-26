import { Token } from '@@/types'

export const LOGIN = 'AUTH/LOGIN'
export const LOGOUT = 'AUTH/LOGOUT'
export const UPDATE_PROFILE = 'AUTH/UPDATE_PROFILE'

export const loginSuccess = (token: Token) => {
  return {
    type: LOGIN,
    token,
  }
}

export const updateProfile = (token: Token) => {
  return {
    type: UPDATE_PROFILE,
    token,
  }
}

export const logOut = () => {
  return {
    type: LOGOUT,
  }
}
