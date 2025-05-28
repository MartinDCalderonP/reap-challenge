import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from './generated/prisma/index.js'
import { adminRouter } from './routes/admin.ts'
import publicRouter from './routes/public.ts'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.use('/admin', adminRouter)
app.use('/', publicRouter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT ?? 4000

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})

export default app
