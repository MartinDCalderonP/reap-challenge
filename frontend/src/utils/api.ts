export interface ApiFetchParams {
  url: string
  options?: {
    method?: string
    headers?: Record<string, string>
    body?: any
  }
}

export const apiFetch = async ({ url, options }: ApiFetchParams) => {
  const { method = 'GET', headers = {}, body } = options ?? {}

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...(body
      ? { body: typeof body === 'string' ? body : JSON.stringify(body) }
      : {})
  }

  const res = await fetch(url, fetchOptions)

  return res
}
