import type { Field, FieldType } from '@/types'
import { capitalize } from '@/utils'
import Input from './Input'
import Button from './Button'
import { useState } from 'react'

interface AddFieldProps {
  addField: (sectionIndex: number, field: Field) => boolean
  sectionIndex: number
}

const FieldTypes: FieldType[] = ['TEXT', 'NUMBER']

const AddField = ({ addField, sectionIndex }: AddFieldProps) => {
  const [label, setLabel] = useState('')
  const [type, setType] = useState<FieldType>('TEXT')

  const handleAdd = () => {
    if (addField(sectionIndex, { label, type })) {
      setLabel('')
      setType('TEXT')
    }
  }

  return (
    <div className='flex gap-2 mt-2 flex-col sm:flex-row'>
      <Input
        placeholder='Field label'
        value={label}
        onChange={(event) => setLabel(event.target.value)}
        required
        className='flex-1'
      />

      <select
        className='border border-gray-300 rounded px-2 py-1 text-base'
        value={type}
        onChange={(event) => setType(event.target.value as FieldType)}
        required
      >
        {FieldTypes.map((fieldType) => (
          <option key={fieldType} value={fieldType}>
            {capitalize(fieldType)}
          </option>
        ))}
      </select>

      <Button
        type='button'
        onClick={handleAdd}
        className='mt-2 sm:mt-0'
        color='secondary'
      >
        Add Field
      </Button>
    </div>
  )
}

export default AddField
