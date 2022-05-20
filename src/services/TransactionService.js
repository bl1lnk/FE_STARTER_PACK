import fetch from 'auth/FetchInterceptor'

const TransactionService = {}

TransactionService.getAllTransactions = function (data) {
  return fetch({
    url: '/transaction/getAll',
    method: 'post',
    data
  })
}

TransactionService.getPlayersTransactions = function (data){
  return fetch({
    url:'/transaction/movement',
    method: 'post',
    data

  })
}

TransactionService.addTransaction = function (data){
  return fetch({
    url:'/transaction/add',
    method: 'post',
    data

  })
}


export default TransactionService