import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/utils/api'

const useAdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const fetchUrl = '/api/admin/login'

    try {
      const res = await apiFetch({
        url: fetchUrl,
        options: {
          method: 'POST',
          body: { username, password }
        }
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
