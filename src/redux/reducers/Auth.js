import {
	AUTH_TOKEN,
	AUTHENTICATED,
	SHOW_AUTH_MESSAGE,
	HIDE_AUTH_MESSAGE,
	SIGNOUT,
	SIGNUP_SUCCESS,
	SHOW_LOADING,
	SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  UPDATE_USER

} from '../constants/Auth';

const initState = {
  loading: false,
  message: '',
  showMessage: false,
  redirect: '',
  token: null,
  user: "",
  role: "ROLE_PLAYER",
  credit: 0,
  code: ""
}

const auth = (state = initState, action) => {
	switch (action.type) {
		case AUTHENTICATED:
			return {
				...state,
				loading: false,
				redirect: '/',
				token: true,
				user: action.user,
				credit: action.credit,
				role: action.role,
				code: action.code
			}
		case SHOW_AUTH_MESSAGE: 
			return {
				...state,
				message: action.message,
				showMessage: true,
				loading: false
			}
		case HIDE_AUTH_MESSAGE: 
			return {
				...state,
				message: '',
				showMessage: false,
			}
		case SIGNOUT: {
			return {
				...state,
				token: null,
				redirect: '/',
				loading: false,
				showMessage: false,
				token: null,
				redirect: "",
				loading: false,
				role: "ROLE_USER",
				user: "",
				credit: 0,
				code: "",
				message : ""
			}
		}
		case UPDATE_USER : {
			return {
				...state,
				loading:false,
				credit: action.credit
			}
		}
		case SIGNUP_SUCCESS: {
			return {
			  ...state,
			  loading: false,
			  token: action.token
			}
		}
		case SHOW_LOADING: {
			return {
				...state,
				loading: true
			}
		}
		case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		default:
			return state;
	}
}

export default auth