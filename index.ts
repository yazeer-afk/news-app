import express, {json} from 'express'
import dotenv from 'dotenv'
import cron from 'node-cron'
import 'express-async-errors'
import { errorHandlerMiddleware } from './middleware/error-handler'
import { notFound } from './middleware/not-found'

dotenv.config()
const app = express()

//Middleware
app.use(json())

const port = process.env.PORT || 5000

app.get('/', (_, res) => {
  res.status(200).send()
})

cron.schedule('* * * * * *', () => {
    console.log('running a task every minute');
  });

// Start of routes


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