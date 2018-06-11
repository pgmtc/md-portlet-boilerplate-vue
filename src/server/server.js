import express from 'express'
import VuePortletServer from "./VuePortletServer"

const port = process.env.PORT || 8080
const app = express()
const server = new VuePortletServer('../../dist/portlet.js');
process.on('uncaughtException', (err) => {
  console.error(err)
})

server.listen(port)

