import { UserAuthState } from '../actions/types'

import {
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGOUT_USER,
	LOADED_USER,
} from '../actions/types'

import { authSuccessType, authFailType } from '../actions/auth'

const initialState: UserAuthState = {
	auth: {
		userId: null,
		username: null,
		token: localStorage.getItem('token'),
		isLoading: localStorage.getItem('token') ? false : true,
		isAuthenticated: localStorage.getItem('token') ? true : false,
	},
}

export const authState = (state = initialState, action: authSuccessType | authFailType) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case LOADED_USER:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				auth: {
					userId: action.payload.userId,
					username: action.payload.username,
					token: action.payload.token,
					isLoading: false,
					isAuthenticated: true,
				},
			}
		case LOGIN_FAILED:
		case REGISTER_FAILED:
		case LOGOUT_USER:
			localStorage.removeItem('token')
			return {
				...state,
				auth: {
					userId: null,
					username: null,
					token: null,
					isLoading: false,
					isAuthenticated: false,
				},
			}
		default:
			return state
	}
}
