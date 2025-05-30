'use client'

import React, { use } from 'react'
import Header from '../../components/Header'
import StepProgress from '../../components/StepProgress'
import SectionForm from '../../components/SectionForm'
import usePublicForm from '@/hooks/usePublicForm'
import Image from 'next/image'
import Loader from '@/components/Loader'

const PublicFormPage = ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = use(params)
  const {
    form,
    loading,
    error,
    values,
    submitted,
    step,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit
  } = usePublicForm({ token })

  if (loading) return <Loader />

  if (error)
    return (
      <div className='bg-[#f7f8f6] flex items-center justify-center min-h-screen text-red-500'>
        {error}
      </div>
    )

  if (submitted)
    return (
      <div className='bg-[#f7f8f6] flex flex-col items-center justify-center min-h-screen'>
        <Image
          src='/Logo.jpeg'
          alt='Reap Logo'
          width={100}
          height={100}
          className='mb-4 rounded-full'
        />
        <h2 className='text-2xl font-bold mb-4 text-black'>Form submitted!</h2>
        <p className='text-gray-600'>Thank you for your response.</p>
      </div>
    )

  if (!form) return null

  const section = form.sections[step]
  const steps = form.sections.map(({ title, fields }) => ({
    title,
    subtitle: fields.map(({ label }) => label).join(', ')
  }))

  return (
    <div className='min-h-screen bg-[#f7f8f6] flex flex-col items-center pb-8'>
      <Header formName={form.name} formDescription={form.description} />
      <StepProgress steps={steps} currentStep={step} />
      <SectionForm
        section={section}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isFirst={step === 0}
        isLast={step === form.sections.length - 1}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  )
}

export default PublicFormPage
