export const requestLogger = (req, res, next) => {
  const datetime = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"})); // timezone ex: Asia/Jerusalem
  const bodyString = req.body ? JSON.stringify(req.body) : '';
  
  if (bodyString.length > 140) {
    const error = new Error('Body length cannot exceed 140 characters')
    error.statusCode = 400
    console.error(`${datetime}: ${req.method} ${req.path}`)
    console.error(`Body length cannot exceed 140 characters: ${JSON.stringify(req.body, null, 2)}`)
    return next(error)
  }
  
  
  console.log(`${datetime}: ${req.method} ${req.path}`)
  console.log(`Request body: \n ${JSON.stringify(req.body, null, 2)}`)
  console.log('---------------')

  next()
}