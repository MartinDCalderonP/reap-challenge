import { FieldType } from '../generated/prisma/index.js'

export interface LoginRequestBody {
  username: string
  password: string
}

export interface FormFieldInput {
  label: string
  type: FieldType
  order?: number
}

export interface FormSectionInput {
  title: string
  description?: string
  order?: number
  fields: FormFieldInput[]
}

export interface FormSectionResponse {
  title: string
  description?: string
  order: number
  fields: FormFieldInput[]
}

export interface CreateFormRequestBody {
  name: string
  sections: FormSectionInput[]
}
