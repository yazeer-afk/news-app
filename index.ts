import express, { json } from 'express'
import dotenv from 'dotenv'
import cron from 'node-cron'

import 'express-async-errors'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandlerMiddleware } from './middleware/error-handler'
import { notFound } from './middleware/not-found'
import newsRouter from './routes/news.router'

dotenv.config()
const app = express()

//Middleware
app.use(json())
app.use(cors())
app.use(helmet())

const port = process.env.PORT || 5000

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

// Start of routes
app.get('/', (_, res) => {
  res.status(200).send("News API")
})

app.use('/news', newsRouter)
// End of routes

app.use(errorHandlerMiddleware)
app.use(notFound)

const start = async () => {
  try {
    app.listen(port, () => console.log(`Running on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()