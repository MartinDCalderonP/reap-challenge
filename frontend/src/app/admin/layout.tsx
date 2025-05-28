import type { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => (
  <div className='min-h-screen bg-gray-50'>
    <header className='bg-white shadow p-4'>
      <h1 className='text-2xl font-bold text-gray-800'>Admin Panel</h1>
    </header>
    <main className='max-w-2xl mx-auto p-4'>{children}</main>
  </div>
)

export default AdminLayout
