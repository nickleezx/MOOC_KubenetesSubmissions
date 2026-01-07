import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

let pingCount = 0

app.get('/', (req, res) => {
  res.send("ping pong application")
})

app.get('/pingpong', (req, res) => {
  res.send(`pong ${pingCount}`)
  pingCount += 1
})

app.listen(PORT, () => {
  console.log(`Ping pong application is running on http://localhost:${PORT}`)
})