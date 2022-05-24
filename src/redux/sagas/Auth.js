import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNOUT,
	SIGNUP,
	SIGNIN_WITH_GOOGLE,
	SIGNIN_WITH_FACEBOOK,
	AUTHENTICATED
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,

	signInWithGoogleAuthenticated,
	signInWithFacebookAuthenticated
} from "../actions/Auth";

import FirebaseService from 'services/FirebaseService'
import JwtAuthService from 'services/JwtAuthService';
import { useHistory } from "react-router-dom";




export function* signInWithFBEmail() {
  yield takeEvery(SIGNIN, function* ({payload}) {
		const {email, password} = payload;
		try {
			const user = yield call(FirebaseService.signInEmailRequest, email, password);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
			
				yield put(authenticated(user.user.uid));
			}
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}



export function* SignOut() {
  	yield takeEvery(SIGNOUT, function* () {
		try {
			yield call(JwtAuthService.signOut);
		} catch (err) {
			console.log(err);
			yield put(showAuthMessage(err));
		}
	});
}

export function* signUpWithFBEmail() {
	yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
		try {
			const user = yield call(FirebaseService.signInGoogleRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
		
				yield put(signInWithGoogleAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export function* signInWithFBGoogle() {
  yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
		try {
			const user = yield call(FirebaseService.signInGoogleRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
		
				yield put(signInWithGoogleAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
		try {
			const user = yield call(FirebaseService.signInFacebookRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
			
				yield put(signInWithFacebookAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export default function* rootSaga() {
  yield all([
		fork(signInWithFBEmail),
		fork(SignOut),
		fork(signUpWithFBEmail),
		fork(signInWithFBGoogle),
		fork(signInWithFacebook)
  ]);
}
