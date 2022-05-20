import fetch from 'auth/FetchInterceptor'

const UserService = {}

UserService.addUser = function (data) {
  return fetch({
    url: '/user/add',
    method: 'post',
    data
  })
}

UserService.users = function () {
  return fetch({
    url: '/user/getAll',
    method: 'get'
  })
}

UserService.changePassword = function(data){
  return fetch({
    url: '/user/password',
    method: 'post',
    data
  })
}

UserService.subChangePassword = function(data){
  return fetch({
    url: '/user/subUserPassword',
    method: 'post',
   data
  })
}

UserService.ChangeStatus = function(data){
  return fetch({
    url: '/user/subUserPassword',
    method: 'post',
    data
  })
}


export default  UserService;