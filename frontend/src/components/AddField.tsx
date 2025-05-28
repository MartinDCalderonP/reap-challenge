import useAddField from '../hooks/useAddField'
import type { Field, FieldType } from '@/types'

interface AddFieldProps {
  onAdd: (field: Field) => void
}

const AddField = ({ onAdd }: AddFieldProps) => {
  const { label, setLabel, type, setType, handleAdd } = useAddField({ onAdd })

  return (
    <div className='flex gap-2 mt-2 flex-col sm:flex-row'>
      <input
        className='border border-gray-300 rounded px-2 py-1 flex-1 text-base'
        placeholder='Field label'
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />
      <select
        className='border border-gray-300 rounded px-2 py-1 text-base'
        value={type}
        onChange={(e) => setType(e.target.value as FieldType)}
        required
      >
        <option value='TEXT'>Text</option>
        <option value='NUMBER'>Number</option>
      </select>
      <button
        className='bg-gray-700 text-white rounded px-3 py-1 font-semibold mt-2 sm:mt-0 cursor-pointer'
        type='button'
        onClick={handleAdd}
      >
        Add Field
      </button>
    </div>
  )
}

export default AddField
