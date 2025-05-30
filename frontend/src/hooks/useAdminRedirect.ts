import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UseAdminRedirectProps {
  setPageLoading: (loading: boolean) => void
  redirectIf: (token: string | null) => boolean
  redirectTo: string
}

const useAdminRedirect = ({
  setPageLoading,
  redirectIf,
  redirectTo
}: UseAdminRedirectProps) => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (redirectIf(token)) {
      router.replace(redirectTo)
    } else {
      setPageLoading(false)
    }
  }, [router, setPageLoading, redirectIf, redirectTo])
}

export default useAdminRedirect
