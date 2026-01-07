import { v4 as uuidv4 } from 'uuid';
import http from 'http'

const PORT = process.env.PORT || 3001

setInterval(() => {
    console.log(`${new Date().toISOString()}: ${uuidv4()}`)
}, 5000)

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end(`${new Date().toISOString()}: ${uuidv4()}`)
})

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})