import fetch from 'auth/FetchInterceptor'

const TransactionService = {}

MovementService.getAll   = function (data) {
  return fetch({
    url: '/transaction/movement',
    method: 'post',
    data
  })
}




export default MovementService