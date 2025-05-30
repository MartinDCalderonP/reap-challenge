'use client'

import { useState } from 'react'
import type { Section } from '@/types'
import { apiFetch } from '@/utils/api'

interface UseCreateFormParams {
  formName: string
  formDescription?: string
  sections: Section[]
}

const useCreateForm = ({
  formName,
  formDescription,
  sections
}: UseCreateFormParams) => {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateForm = async () => {
    setError('')

    if (!formName.trim() || sections.length === 0) {
      setError('Form name and at least one section are required')
      return
    }

    setLoading(true)

    const fetchUrl = '/api/admin/forms'

    try {
      const res = await apiFetch({
        url: fetchUrl,
        options: {
          method: 'POST',
          headers: {
            Authorization: localStorage.getItem('adminToken') ?? ''
          },
          body: {
            name: formName,
            description: formDescription,
            sections: sections.map((section, index) => ({
              title: section.title,
              description: section.description,
              order: index,
              fields: section.fields.map((field, fieldIndex) => ({
                ...field,
                order: fieldIndex
              }))
            }))
          }
        }
      })

      const data = await res.json()

      if (data.success && data.form) {
        const tokenRes = await apiFetch({
          url: `${fetchUrl}/${data.form.id}/token`,
          options: {
            method: 'POST',
            headers: {
              Authorization: localStorage.getItem('adminToken') ?? ''
            }
          }
        })

        const tokenData = await tokenRes.json()

        if (tokenData.success && tokenData.token) setLink(tokenData.token)
        else setError('Failed to generate form link')
      } else {
        setError('Failed to create form')
      }
    } catch {
      setError('Network error, please try again')
    } finally {
      setLoading(false)
    }
  }

  return {
    link,
    error,
    loading,
    handleCreateForm
  }
}

export default useCreateForm
