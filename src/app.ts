import express from 'express'
import { router } from './routes'
import { resolve } from 'path'

const app = express()

app.use(express.json())

app.use('/data', express.static(resolve(__dirname, '../data')))

app.use(router)

export default app
