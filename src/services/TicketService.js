import fetch from 'auth/FetchInterceptor'

const TicketService = {}

TicketService.getTicket = function ({code}) {
  return fetch({
    url: '/ticket/get/'+code,
    method: 'get',

  })
}

TicketService.setPost = function (data) {
  return fetch({
    url: '/posts',
    method: 'post',
    data: data
  })
}
TicketService.addTicket = function ({roundes, price}) {
  return fetch({
    url: '/ticket/add',
    method: 'post',
    data: {roundes, price}
  })
}


TicketService.updateTicket = function ({code}) {
  return fetch({
    url: '/ticket/pay',
    method: 'post',
    data: {code}
  })
}


export default TicketService