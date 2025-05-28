import { type NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const url = `${BACKEND_URL}/admin/${params.path.join('/')}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...Object.fromEntries(request.headers.entries())
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
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params
  const url = `${BACKEND_URL}/admin/${path.join('/')}`
  const body = await request.text()
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: request.headers.get('authorization') || ''
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const url = `${BACKEND_URL}/admin/${params.path.join('/')}`
  const body = await request.text()
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...Object.fromEntries(request.headers.entries())
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const url = `${BACKEND_URL}/admin/${params.path.join('/')}`
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...Object.fromEntries(request.headers.entries())
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
