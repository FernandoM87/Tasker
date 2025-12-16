import { Navbar } from '@/components/dashboard/Navbar'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { ReactNode } from 'react'

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex">
      {/* Sidebar izquierdo */}
      <Sidebar />
      
      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar superior */}
        <Navbar />
        
        {/* Contenido */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}