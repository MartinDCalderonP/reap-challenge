'use client'

import { useState, type ChangeEvent } from 'react'
import useAdminLogin from '@/hooks/useAdminLogin'
import Loader from '@/components/Loader'
import useAdminRedirect from '@/hooks/useAdminRedirect'

const AdminLoginPage = () => {
  const [pageLoading, setPageLoading] = useState(true)

  const {
    error,
    handleSubmit,
    loading,
    password,
    setPassword,
    setUsername,
    username
  } = useAdminLogin()

  useAdminRedirect({ setPageLoading })

  if (pageLoading) return <Loader />

  const formInputs = [
    {
      type: 'text',
      placeholder: 'Username',
      value: username,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setUsername(event.target.value),
      required: true,
      name: 'username'
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: password,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value),
      required: true,
      name: 'password'
    }
  ]

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#f7f8f6]'>
      <div className='bg-white rounded-xl shadow p-8 min-w-[350px]'>
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-900'>
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {formInputs.map((input) => (
            <input
              key={input.name}
              className='border border-gray-300 rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-green-500'
              {...input}
            />
          ))}

          <button
            className='w-full bg-green-800 text-white font-semibold rounded py-3 text-lg mt-2 transition-colors active:bg-green-900 disabled:opacity-60'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <div className='text-red-500 text-center mt-2'>{error}</div>
          )}
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
