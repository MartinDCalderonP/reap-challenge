'use client'

import { useState, useEffect } from 'react'
import { useSections } from '@/hooks/useSections'
import { useCreateForm } from '@/hooks/useCreateForm'
import SectionList from '@/components/SectionList'
import AddSection from '@/components/AddSection'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'

const AdminPage = () => {
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(true)
  const [formName, setFormName] = useState('')
  const { sections, setSections } = useSections({ initialSections: [] })
  const { link, error, loading, handleCreateForm } = useCreateForm({
    formName,
    sections
  })

  const handleCreate = () => {
    handleCreateForm()
  }

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (!token) router.replace('/')
    else setPageLoading(false)
  }, [router])

  if (pageLoading) return <Loader />

  return (
    <div className='max-w-2xl mx-auto py-6 px-2 sm:px-0 text-black'>
      <div className='text-2xl font-semibold mb-6 text-center'>
        Create New Form
      </div>

      <input
        className='border border-gray-300 rounded px-3 py-2 w-full mb-4 text-base'
        placeholder='Form name'
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        required
      />

      <SectionList sections={sections} setSections={setSections} />

      <AddSection sections={sections} setSections={setSections} />

      {error && <div className='text-red-500 mb-2 text-center'>{error}</div>}

      <button
        className='cursor-pointer w-full bg-green-800 text-white font-semibold rounded py-3 text-lg mt-2 mb-4 disabled:opacity-60 disabled:cursor-not-allowed'
        type='button'
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Form & Generate Link'}
      </button>

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
