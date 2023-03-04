class Routes {
  #io
  constructor(io){
    this.#io = io
  }

  async post(request, response) {
    const { headers } = request

    console.log('chamou')

    const onFinish = (response, redirectTo) => {
      response.writeHead(303, {
        Connection: 'close',
        Location: `${redirectTo}?msg=Files uploaded with success!`
      })
      response.end()
    }
    return onFinish(response, headers.origin)
  }
}

module.exports = Routes