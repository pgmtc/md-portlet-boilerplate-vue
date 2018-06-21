import VuePortletServer from './VuePortletServer'
const PORT = process.env.PORT || 8080
const GRPC_PORT = process.env.GRPC_PORT || 50051
const server = new VuePortletServer('../../dist/portlet.js', './vuePortlet.proto')
process.on('uncaughtException', (err) => {
  console.error(err)
})

server.listen(PORT)
server.listenGrpc(GRPC_PORT)
