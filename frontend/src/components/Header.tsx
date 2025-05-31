import React from 'react'
import Image from 'next/image'

interface HeaderProps {
  formName: string
  formDescription?: string
}

const Header = ({ formName, formDescription }: HeaderProps) => (
  <header className='flex flex-col items-center my-8'>
    <Image
      src='/Logo.jpeg'
      alt='Reap Logo'
      width={80}
      height={32}
      className='mb-6'
    />

    <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center'>
      {formName}
    </h1>

    {formDescription && (
      <p className='text-gray-600 text-center max-w-xl mb-2'>
        {formDescription}
      </p>
    )}
  </header>
)

export default Header
