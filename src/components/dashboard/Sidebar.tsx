'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiTrello, FiSettings } from 'react-icons/fi'

export function Sidebar() {
  const pathname = usePathname()
  
  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: FiHome },
    { href: '/boards', label: 'Boards', icon: FiTrello },
    { href: '/settings', label: 'Configuración', icon: FiSettings },
  ]
  
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Trello Clone</h2>
      </div>
      
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="text-xl" />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}