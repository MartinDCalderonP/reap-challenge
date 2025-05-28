import React from 'react'

interface SectionStepProps {
  title: string
  description: string
  active: boolean
}

const SectionStep = ({ title, description, active }: SectionStepProps) => (
  <div className='flex flex-col items-center w-32'>
    <div
      className={
        active
          ? 'w-6 h-6 rounded-full border-2 border-green-800 bg-green-50 mb-2'
          : 'w-6 h-6 rounded-full border-2 border-gray-300 bg-white mb-2'
      }
    />
    <div className='text-center'>
      <div
        className={
          active
            ? 'text-green-800 font-semibold text-base'
            : 'text-gray-500 font-medium text-base'
        }
      >
        {title}
      </div>
      <div className='text-gray-400 text-sm'>{description}</div>
    </div>
  </div>
)

export default SectionStep
