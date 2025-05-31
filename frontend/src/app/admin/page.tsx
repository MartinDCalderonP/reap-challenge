'use client'

import { type ChangeEvent, useState } from 'react'
import useSections from '@/hooks/useSections'
import useCreateForm from '@/hooks/useCreateForm'
import SectionList from '@/components/SectionList'
import AddSection from '@/components/AddSection'
import Loader from '@/components/Loader'
import Input from '@/components/Input'
import Button from '@/components/Button'
import useAdminRedirect from '@/hooks/useAdminRedirect'

const AdminPage = () => {
  const [pageLoading, setPageLoading] = useState(true)
  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const { sections, addSection, addField } = useSections({
    initialSections: []
  })
  const { link, error, loading, handleCreateForm } = useCreateForm({
    formName,
    formDescription,
    sections
  })

  useAdminRedirect({
    setPageLoading,
    redirectIf: (token) => !token,
    redirectTo: '/'
  })

  if (pageLoading) return <Loader />

  const inputs = [
    {
      className: 'w-full mb-4',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setFormName(event.target.value),
      placeholder: 'Form name',
      required: true,
      value: formName
    },
    {
      className: 'w-full mb-4',
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setFormDescription(event.target.value),
      placeholder: 'Form description (optional)',
      value: formDescription
    }
  ]

  return (
    <div className='max-w-2xl mx-auto py-6 px-2 sm:px-0 text-black'>
      <div className='text-2xl font-semibold mb-6 text-center'>
        Create New Form
      </div>

      {inputs.map(({ className, onChange, placeholder, required, value }) => (
        <Input
          key={placeholder}
          className={className}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          value={value}
        />
      ))}

      <SectionList sections={sections} addField={addField} />

      <AddSection addSection={addSection} />

      {error && <div className='text-red-500 mb-2 text-center'>{error}</div>}

      <Button
        type='button'
        onClick={handleCreateForm}
        disabled={loading}
        fullWidth
        className='mt-2 mb-4'
      >
        {loading ? 'Creating...' : 'Create Form'}
      </Button>

      {link && (
        <div className='bg-green-50 border border-green-200 rounded p-4 mt-4 text-center break-words'>
          <div className='font-semibold mb-1'>Form Link:</div>
          <div className='text-green-800 break-all'>
            {typeof window !== 'undefined' ? window.location.origin : ''}/{link}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
