import express from 'express'
import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()
const publicRouter = express.Router()

publicRouter.get('/form/:token', async (req, res) => {
  try {
    const { token } = req.params

    const formToken = await prisma.formToken.findUnique({
      where: { token },
      include: {
        form: {
          include: {
            sections: {
              include: {
                fields: true
              }
            }
          }
        }
      }
    })

    if (!formToken) {
      res.status(404).json({
        success: false,
        message: 'Invalid or expired form link'
      })
      return
    }

    res.json({
      success: true,
      form: formToken.form
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch form',
      error: (err as Error).message
    })
  }
})

publicRouter.post('/form/:token/submit', async (req, res) => {
  try {
    const { token } = req.params

    const formToken = await prisma.formToken.findUnique({
      where: { token },
      include: { form: true }
    })

    if (!formToken) {
      res.status(404).json({
        success: false,
        message: 'Invalid or expired form link'
      })
      return
    }

    await prisma.submission.create({
      data: {
        formTokenId: formToken.id,
        formId: formToken.formId,
        data: req.body
      }
    })

    res.json({
      success: true,
      message: 'Form submitted successfully'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit form',
      error: (err as Error).message
    })
  }
})

export default publicRouter
