import { Navbar } from '@/components/dashboard/Navbar'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { ReactNode } from 'react'

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* superior Navbar  */}
        <Navbar />
        
        {/* Content */}
        <main className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}