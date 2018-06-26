import VuePortletServer from './VuePortletServer'
const PORT = process.env.PORT || 8080
const GRPC_PORT = process.env.GRPC_PORT || 50051
const server = new VuePortletServer({
  id: 'vuePortlet',
  portletLocation: '../../dist/portlet.js',
  grpcDefLocation: './vuePortlet.proto',
  msgHubServer: process.env.MSGHUB_SERVER || 'nats://localhost:4222',
  msgHubId: process.env.MSGHUB_ID || 'mdesktop',
  enableNats: true,
  enableHttp: true,
  enableGrpc: true
})
process.on('uncaughtException', (err) => {
  console.error(err)
})

server.listen(PORT)
server.listenGrpc(GRPC_PORT)
