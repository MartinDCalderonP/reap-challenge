'use client'

import { useState } from 'react'
import type { Field, Section } from '@/types'

interface UseSectionsParams {
  initialSections: Section[]
}

export const useSections = ({ initialSections }: UseSectionsParams) => {
  const [sections, setSections] = useState<Section[]>(initialSections)

  const addSection = (title: string, description?: string) => {
    if (!title.trim()) return false

    setSections([
      ...sections,
      {
        title,
        description,
        order: sections.length,
        fields: []
      }
    ])
    return true
  }

  const addField = (sectionIndex: number, field: Field) => {
    if (!field.label.trim()) return false

    setSections(
      sections.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              fields: [
                ...section.fields,
                {
                  ...field,
                  order: section.fields.length
                }
              ]
            }
          : section
      )
    )
    return true
  }

  return { sections, setSections, addSection, addField }
}
