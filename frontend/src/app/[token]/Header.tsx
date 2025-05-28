import React from 'react'
import Image from 'next/image'

const Header = () => (
  <header className='flex flex-col items-center my-8'>
    <Image
      src='/Logo.jpeg'
      alt='Reap Logo'
      width={80}
      height={32}
      className='mb-6'
    />
    <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center'>
      Collect resident information via Secure Form
    </h1>
    <p className='text-gray-600 text-center max-w-xl mb-2'>
      Please use this secure form to provide Resident information and documents
      to upload to the Resident Profile of James Wilson
    </p>
  </header>
)

export default Header
