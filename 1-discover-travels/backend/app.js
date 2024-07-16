const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
const port = 8700

app.use(express.json())
dotenv.config() 

app.use(cors({ origin: process.env.FRONTEND_URL }))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/travels', require('./routes/travels').router)

app.use('/comments', require('./routes/cmnts').router)

app.use('/auth', require('./routes/auth').router)

app.listen(port, () => {
  console.log(`Recipes app listening on port ${port}`)
})