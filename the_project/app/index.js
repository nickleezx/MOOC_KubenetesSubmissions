import express from 'express'
const PORT = process.env.PORT || 3001;

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello world from express!</h1>')
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})