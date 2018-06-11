import VuePortletServer from './VuePortletServer'
const port = process.env.PORT || 8080
const server = new VuePortletServer('../../dist/portlet.js')
process.on('uncaughtException', (err) => {
  console.error(err)
})

server.listen(port)
