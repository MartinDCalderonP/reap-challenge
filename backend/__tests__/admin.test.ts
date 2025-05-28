import request from 'supertest'
import app from '../index'

describe('Admin API', () => {
  let adminToken = ''
  let createdFormId = ''

  test('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/admin/login')
      .send({ username: 'admin', password: 'wrong' })
    expect(res.status).toBe(401)
    expect(res.body.success).toBe(false)
  })

  test('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/admin/login')
      .send({ username: 'admin', password: 'reap2025' })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.token).toBeDefined()
    adminToken = res.body.token
  })

  test('should create a new form', async () => {
    const res = await request(app)
      .post('/admin/forms')
      .set('Authorization', adminToken)
      .send({
        name: 'Test Form',
        sections: [
          {
            title: 'Section 1',
            description: 'Descripción de la sección',
            fields: [
              { label: 'Field 1', type: 'TEXT' },
              { label: 'Field 2', type: 'NUMBER' }
            ]
          }
        ]
      })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.form).toBeDefined()
    expect(res.body.form.id).toBeDefined()
    expect(res.body.form.sections[0].description).toBe(
      'Descripción de la sección'
    )
    createdFormId = res.body.form.id
  })

  test('should generate a token for the created form', async () => {
    const res = await request(app)
      .post(`/admin/forms/${createdFormId}/token`)
      .set('Authorization', adminToken)
      .send()
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.token).toBeDefined()
    expect(res.body.url).toContain('/form/')
  })

  test('should fetch all forms', async () => {
    const res = await request(app)
      .get('/admin/forms')
      .set('Authorization', adminToken)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.forms)).toBe(true)
  })
})
