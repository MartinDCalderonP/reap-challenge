let adminSession: string | null = null

export const setAdminSession = (token: string) => {
  adminSession = token
}

export const getAdminSession = () => adminSession

export const clearAdminSession = () => {
  adminSession = null
}
