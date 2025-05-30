'use client'

import { useState } from 'react'
import Input from './Input'
import Button from './Button'

interface AddSectionProps {
  addSection: (title: string, description?: string) => boolean
}

const AddSection = ({ addSection }: AddSectionProps) => {
  const [newSectionTitle, setNewSectionTitle] = useState('')
  const [newSectionDescription, setNewSectionDescription] = useState('')

  return (
    <div className='flex gap-2 mt-2 flex-col sm:flex-row'>
      <Input
        placeholder='Section title'
        value={newSectionTitle}
        onChange={(event) => setNewSectionTitle(event.target.value)}
        required
        className='flex-1'
      />
      <Input
        placeholder='Section description (optional)'
        value={newSectionDescription}
        onChange={(event) => setNewSectionDescription(event.target.value)}
        className='flex-1'
      />
      <Button
        type='button'
        onClick={() => {
          if (addSection(newSectionTitle, newSectionDescription)) {
            setNewSectionTitle('')
            setNewSectionDescription('')
          }
        }}
        className='mt-2 sm:mt-0'
      >
        Add Section
      </Button>
    </div>
  )
}

export default AddSection
