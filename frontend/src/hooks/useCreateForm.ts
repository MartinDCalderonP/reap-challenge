'use client'

import { useState } from 'react'
import type { Section } from '@/types'

interface UseCreateFormParams {
  formName: string
  formDescription?: string
  sections: Section[]
}

export function useCreateForm({
  formName,
  formDescription,
  sections
}: UseCreateFormParams) {
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

    try {
      const res = await fetch('/api/admin/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('adminToken') ?? ''
        },
        body: JSON.stringify({
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
        })
      })

      const data = await res.json()

      if (data.success && data.form) {
        const tokenRes = await fetch(`/api/admin/forms/${data.form.id}/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('adminToken') ?? ''
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
