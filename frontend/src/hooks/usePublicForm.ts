'use client'

import { useState, useEffect } from 'react'
import type { Form } from '@/types'
import { apiFetch } from '@/utils/api'

interface UsePublicFormParams {
  token: string
}

const publicUrl = '/api/public/form'

const usePublicForm = ({ token }: UsePublicFormParams) => {
  const [form, setForm] = useState<Form | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [values, setValues] = useState<Record<string, string | number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(0)

  const fetchUrl = `${publicUrl}/${token}`

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await apiFetch({ url: fetchUrl })
        const data = await res.json()
        if (!data.success || !data.form) {
          setError('Form not found or invalid token.')
        } else {
          setForm(data.form)
        }
      } catch {
        setError('Error loading form.')
      } finally {
        setLoading(false)
      }
    }
    fetchForm()
  }, [token])

  const handleChange = (fieldKey: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldKey]: value }))
  }

  const handleNext = () => {
    if (form && step < form.sections.length - 1) setStep(step + 1)
  }
  const handlePrev = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setError('')
    try {
      const res = await apiFetch({
        url: `${fetchUrl}/submit`,
        options: {
          method: 'POST',
          body: values
        }
      })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else setError(data.message ?? 'Error submitting form.')
    } catch {
      setError('Error submitting form.')
    }
  }

  return {
    form,
    loading,
    error,
    values,
    setValues,
    submitted,
    step,
    setStep,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit
  }
}

export default usePublicForm
