import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UseAdminRedirectProps {
  setPageLoading: (loading: boolean) => void
}
const useAdminRedirect = ({ setPageLoading }: UseAdminRedirectProps) => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (token) router.replace('/admin')
    else setPageLoading(false)
  }, [router])
}

export default useAdminRedirect
