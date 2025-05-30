'use client'

import { useState } from 'react'
import { useSections } from '@/hooks/useSections'
import { useCreateForm } from '@/hooks/useCreateForm'
import SectionList from '@/components/SectionList'
import AddSection from '@/components/AddSection'
import Loader from '@/components/Loader'
import Input from '@/components/Input'
import Button from '@/components/Button'
import useAdminRedirect from '@/hooks/useAdminRedirect'

const AdminPage = () => {
  const [pageLoading, setPageLoading] = useState(true)
  const [formName, setFormName] = useState('')
  const { sections, setSections } = useSections({ initialSections: [] })
  const { link, error, loading, handleCreateForm } = useCreateForm({
    formName,
    sections
  })

  useAdminRedirect({
    setPageLoading,
    redirectIf: (token) => !token,
    redirectTo: '/'
  })

  if (pageLoading) return <Loader />

  return (
    <div className='max-w-2xl mx-auto py-6 px-2 sm:px-0 text-black'>
      <div className='text-2xl font-semibold mb-6 text-center'>
        Create New Form
      </div>

      <Input
        placeholder='Form name'
        value={formName}
        onChange={(event) => setFormName(event.target.value)}
        required
        className='w-full mb-4'
      />

      <SectionList sections={sections} setSections={setSections} />

      <AddSection sections={sections} setSections={setSections} />

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
