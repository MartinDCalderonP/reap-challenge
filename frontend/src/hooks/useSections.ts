'use client'

import { useState } from 'react'
import type { Field, Section } from '@/types'

interface UseSectionsParams {
  initialSections: Section[]
}

export const useSections = ({ initialSections }: UseSectionsParams) => {
  const [sections, setSections] = useState<Section[]>(initialSections)

  const addSection = (title: string, description?: string) => {
    if (!title.trim()) return

    setSections([
      ...sections,
      {
        title,
        description,
        order: sections.length,
        fields: []
      }
    ])
  }

  const addField = (sectionIndex: number, field: Field) => {
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
  }

  return { sections, setSections, addSection, addField }
}
