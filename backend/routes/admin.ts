import express from 'express'
import crypto from 'crypto'
import { PrismaClient, FieldType } from '../generated/prisma/index.js'
import { requireAdminAuth } from '../middleware/requireAdminAuth.ts'
import { setAdminSession } from '../middleware/session.ts'
import type {
  LoginRequestBody,
  FormFieldInput,
  FormSectionInput,
  CreateFormRequestBody
} from '../types/form.js'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'reap2025'

export const adminRouter = express.Router()
const prisma = new PrismaClient()

adminRouter.post('/login', (req, res) => {
  const { username, password } = req.body as LoginRequestBody
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const sessionToken = Math.random().toString(36).slice(2)
    setAdminSession(sessionToken)
    return res.json({ success: true, token: sessionToken })
  }
  return res
    .status(401)
    .json({ success: false, message: 'Invalid credentials' })
})

adminRouter.use(requireAdminAuth)

adminRouter.post('/forms/:id/token', async (req, res) => {
  try {
    const { id } = req.params

    const token = crypto.randomBytes(32).toString('hex')

    const form = await prisma.form.findUnique({
      where: { id },
      include: { sections: { include: { fields: true } } }
    })

    if (!form) {
      res.status(404).json({
        success: false,
        message: 'Form not found'
      })
      return
    }

    const formToken = await prisma.formToken.create({
      data: {
        formId: id,
        token
      }
    })

    res.json({
      success: true,
      url: `/form/${token}`,
      token: formToken.token,
      form
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate token',
      error: (err as Error).message
    })
  }
})

adminRouter.post('/forms', async (req, res) => {
  try {
    const { name, description, sections } = req.body as CreateFormRequestBody

    if (!name || !Array.isArray(sections) || sections.length === 0) {
      res.status(400).json({ success: false, message: 'Invalid form data' })
      return
    }

    for (const section of sections) {
      for (const field of section.fields) {
        if (!Object.values(FieldType).includes(field.type)) {
          res.status(400).json({
            success: false,
            message: `Invalid field type: ${field.type}`
          })
          return
        }
      }
    }

    const form = await prisma.form.create({
      data: {
        name,
        description,
        sections: {
          create: sections.map(
            (section: FormSectionInput, sectionIndex: number) => ({
              title: section.title,
              description: section.description,
              order: section.order ?? sectionIndex,
              fields: {
                create: (section.fields || []).map(
                  (field: FormFieldInput, fieldIndex: number) => ({
                    label: field.label,
                    type: field.type,
                    order: field.order ?? fieldIndex
                  })
                )
              }
            })
          )
        }
      },
      include: {
        sections: {
          include: {
            fields: true
          }
        }
      }
    })

    res.json({
      success: true,
      form
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create form',
      error: (err as Error).message
    })
  }
})

adminRouter.get('/forms', async (_req, res) => {
  try {
    const forms = await prisma.form.findMany({
      include: { sections: { include: { fields: true } }, tokens: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, forms })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch forms',
      error: (err as Error).message
    })
  }
})
