import request from 'supertest'
import app from '../index'

describe('Public Form Token Validation', () => {
  let adminToken = ''
  let formToken = ''
  let formId = ''

  beforeAll(async () => {
    // Login admin y crea un form y token para tests públicos
    const loginRes = await request(app)
      .post('/admin/login')
      .send({ username: 'admin', password: 'reap2025' })
    adminToken = loginRes.body.token

    const formRes = await request(app)
      .post('/admin/forms')
      .set('Authorization', adminToken)
      .send({
        name: 'Public Test Form',
        sections: [
          {
            title: 'Section 1',
            fields: [
              { label: 'Field 1', type: 'TEXT' },
              { label: 'Field 2', type: 'NUMBER' }
            ]
          }
        ]
      })
    formId = formRes.body.form.id

    const tokenRes = await request(app)
      .post(`/admin/forms/${formId}/token`)
      .set('Authorization', adminToken)
      .send()
    formToken = tokenRes.body.token
  })

  test('should return 404 for invalid token', async () => {
    const res = await request(app).get('/form/invalidtoken')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  test('should fetch form with valid token', async () => {
    const res = await request(app).get(`/form/${formToken}`)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.form).toBeDefined()
    expect(res.body.form.sections.length).toBeGreaterThan(0)
  })
})

describe('Form Submission', () => {
  let adminToken = ''
  let formToken = ''
  let formId = ''

  beforeAll(async () => {
    // Login admin y crea un form y token para tests públicos
    const loginRes = await request(app)
      .post('/admin/login')
      .send({ username: 'admin', password: 'reap2025' })
    adminToken = loginRes.body.token

    const formRes = await request(app)
      .post('/admin/forms')
      .set('Authorization', adminToken)
      .send({
        name: 'Submission Test Form',
        sections: [
          {
            title: 'Section 1',
            fields: [
              { label: 'Field 1', type: 'TEXT' },
              { label: 'Field 2', type: 'NUMBER' }
            ]
          }
        ]
      })
    formId = formRes.body.form.id

    const tokenRes = await request(app)
      .post(`/admin/forms/${formId}/token`)
      .set('Authorization', adminToken)
      .send()
    formToken = tokenRes.body.token
  })

  test('should return 404 for submission with invalid token', async () => {
    const res = await request(app)
      .post('/form/invalidtoken/submit')
      .send({ field: 'value' })
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })

  test('should submit form with valid token', async () => {
    const res = await request(app)
      .post(`/form/${formToken}/submit`)
      .send({ 'Section 1-Field 1': 'Test', 'Section 1-Field 2': 123 })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toMatch(/success/i)
  })
})
