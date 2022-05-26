import * as authActions from '@@/actions/auth'
import { clearAuthToken } from '@@/libs/authentication'

const initialState = {
  isLogin: false,
  token: undefined,
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case authActions.LOGIN:
    case authActions.UPDATE_PROFILE:
      return {
        ...state,
        isLogin: true,
        token: action.token,
      }
    case authActions.LOGOUT:
      clearAuthToken()
      return {
        ...state,
        isLogin: false,
        token: undefined,
      }
    default:
      return state
  }
}
