import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const useAdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password
        })
      })
      
      const data = await res.json()

      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token)
        router.replace('/admin')
      } else {
        setError(data.message ?? 'Login failed')
      }
    } catch {
      setError('Network error, please try again')
    } finally {
      setLoading(false)
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleSubmit
  }
}

export default useAdminLogin
