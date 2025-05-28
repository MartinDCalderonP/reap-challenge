'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAdminLogin from '@/hooks/useAdminLogin'
import Loader from '@/components/Loader'

const AdminLoginPage = () => {
  const [pageLoading, setPageLoading] = useState(true)
  const router = useRouter()
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleSubmit
  } = useAdminLogin()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (token) router.replace('/admin')
    else setPageLoading(false)
  }, [router])

  if (pageLoading) return <Loader />

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#f7f8f6]'>
      <div className='bg-white rounded-xl shadow p-8 min-w-[350px]'>
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-900'>
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            className='border border-gray-300 rounded px-3 py-2 w-full bg-gray-50 text-base text-black'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className='border border-gray-300 rounded px-3 py-2 w-full bg-gray-50 text-base text-black'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
