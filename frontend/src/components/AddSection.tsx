'use client'

import { type ChangeEvent, useState } from 'react'
import Input from './Input'
import Button from './Button'

interface AddSectionProps {
  addSection: (title: string, description?: string) => boolean
}

const AddSection = ({ addSection }: AddSectionProps) => {
  const [newSectionTitle, setNewSectionTitle] = useState('')
  const [newSectionDescription, setNewSectionDescription] = useState('')

  const inputs = [
    {
      className: 'flex-1',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setNewSectionTitle(event.target.value),
      placeholder: 'Section title',
      value: newSectionTitle,
      required: true
    },
    {
      className: 'flex-1',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setNewSectionDescription(event.target.value),
      placeholder: 'Section description (optional)',
      value: newSectionDescription
    }
  ]

  return (
    <div className='flex gap-2 mt-2 flex-col sm:flex-row'>
      {inputs.map(({ className, onChange, placeholder, required, value }) => (
        <Input
          className={className}
          key={placeholder}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          value={value}
        />
      ))}
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
