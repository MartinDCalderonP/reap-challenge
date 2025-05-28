'use client'

import { useState } from 'react'
import type { Section } from '@/types'

interface AddSectionProps {
  sections: Section[]
  setSections: (s: Section[]) => void
}

const AddSection = ({ sections, setSections }: AddSectionProps) => {
  const [newSectionTitle, setNewSectionTitle] = useState('')
  const [newSectionDescription, setNewSectionDescription] = useState('')
  return (
    <div className='flex gap-2 mt-2 flex-col sm:flex-row'>
      <input
        className='border border-gray-300 rounded px-2 py-1 flex-1 text-base'
        placeholder='Section title'
        value={newSectionTitle}
        onChange={(e) => setNewSectionTitle(e.target.value)}
        required
      />
      <input
        className='border border-gray-300 rounded px-2 py-1 flex-1 text-base'
        placeholder='Section description (optional)'
        value={newSectionDescription}
        onChange={(e) => setNewSectionDescription(e.target.value)}
      />
      <button
        className='bg-green-800 text-white rounded px-4 py-1 font-semibold mt-2 sm:mt-0 cursor-pointer'
        type='button'
        onClick={() => {
          if (newSectionTitle.trim()) {
            setSections([
              ...sections,
              {
                title: newSectionTitle,
                description: newSectionDescription,
                order: sections.length,
                fields: []
              }
            ])
            setNewSectionTitle('')
            setNewSectionDescription('')
          }
        }}
      >
        Add Section
      </button>
    </div>
  )
}

export default AddSection
