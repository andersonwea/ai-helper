import express from 'express'
import { router } from './routes'
import { resolve } from 'path'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

app.use('/data', express.static(resolve(__dirname, '../data')))

app.use(router)

export default app
