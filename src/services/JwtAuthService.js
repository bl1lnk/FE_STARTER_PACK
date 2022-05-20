import fetch from 'auth/FetchInterceptor'

const JwtAuthService = {}

JwtAuthService.login = function (data) {
	return fetch({
		url: '/login_check',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: data
	})
}

JwtAuthService.signUp = function (data) {
	return fetch({
		url: '/auth/signup',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: data
	})
}

JwtAuthService.signOut = function () {
	return fetch({
		url: '/user/logout',
		method: 'get',
		headers: {
      'public-request': 'true'
    },

	})
}


export default JwtAuthService