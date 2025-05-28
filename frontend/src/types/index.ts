export type FieldType = 'TEXT' | 'NUMBER'

export interface Field {
  label: string
  type: FieldType
  order?: number
}

export interface Section {
  title: string
  description?: string
  order: number
  fields: Field[]
}

export interface Form {
  name: string
  sections: Section[]
}

export interface Step {
  title: string
  subtitle: string
}
