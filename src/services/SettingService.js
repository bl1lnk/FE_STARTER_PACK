import fetch from 'auth/FetchInterceptor'

const SettingService = {}

SettingService.AllSetting = function () {
  return fetch({
    url: '/slot/get',
    method: 'get'
  
  })
}


SettingService.update = function (data) {
  return fetch({
    url: '/slot/change',
    method: 'post',
    data
  
  })
}





export default  SettingService;