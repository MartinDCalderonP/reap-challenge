import { type NextRequest, NextResponse } from 'next/server'
import { apiFetch } from '@/utils/api'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params
  const url = `${BACKEND_URL}/${path.join('/')}`
  const headers: Record<string, string> = {}

  req.headers.forEach((value, key) => {
    headers[key] = value
  })

  const res = await apiFetch({
    url,
    options: {
      method: req.method,
      headers,
      body: req.body
    }
  })

  const data = await res.text()

  return new NextResponse(data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'application/json'
    }
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params
  const url = `${BACKEND_URL}/${path.join('/')}`
  const body = await req.text()
  const headers: Record<string, string> = {}

  req.headers.forEach((value, key) => {
    headers[key] = value
  })

  const res = await apiFetch({
    url,
    options: {
      method: req.method,
      headers,
      body
    }
  })

  const data = await res.text()
  
  return new NextResponse(data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'application/json'
    }
  })
}
