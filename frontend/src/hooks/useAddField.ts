'use client'

import { useState } from 'react'
import type { Field, FieldType } from '@/types'

interface UseAddFieldParams {
  onAdd: (field: Field) => void
}

const useAddField = ({ onAdd }: UseAddFieldParams) => {
  const [label, setLabel] = useState('')
  const [type, setType] = useState<FieldType>('TEXT')

  const handleAdd = () => {
    if (label.trim()) {
      onAdd({ label, type })
      setLabel('')
      setType('TEXT')
    }
  }

  return {
    label,
    setLabel,
    type,
    setType,
    handleAdd
  }
}

export default useAddField
