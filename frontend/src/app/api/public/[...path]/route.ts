import { type NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params
  console.log(path)
  const url = `${BACKEND_URL}/${path.join('/')}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
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
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  const data = await res.text()
  return new NextResponse(data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'application/json'
    }
  })
}
