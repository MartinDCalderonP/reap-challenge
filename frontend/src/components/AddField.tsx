import useAddField from '../hooks/useAddField'
import type { Field, FieldType } from '@/types'
import { capitalize } from '@/utils'
import Input from './Input'
import Button from './Button'

interface AddFieldProps {
  onAdd: (field: Field) => void
}

const FieldTypes: FieldType[] = ['TEXT', 'NUMBER']

const AddField = ({ onAdd }: AddFieldProps) => {
  const { label, setLabel, type, setType, handleAdd } = useAddField({ onAdd })

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
