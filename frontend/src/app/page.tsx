'use client'

import { useState, type ChangeEvent } from 'react'
import useAdminLogin from '@/hooks/useAdminLogin'
import Loader from '@/components/Loader'
import useAdminRedirect from '@/hooks/useAdminRedirect'
import Input from '@/components/Input'
import Button from '@/components/Button'

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

  useAdminRedirect({
    setPageLoading,
    redirectIf: (token) => !!token,
    redirectTo: '/admin'
  })

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
            <Input key={input.name} {...input} />
          ))}

          <Button
            className='w-full mt-2'
            color='primary'
            disabled={loading}
            fullWidth
            type='submit'
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {error && (
            <div className='text-red-500 text-center mt-2'>{error}</div>
          )}
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
