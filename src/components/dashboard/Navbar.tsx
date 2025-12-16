'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export function Navbar() {
  const { data: session } = useSession()
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || 'Usuario'}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="text-sm font-medium text-gray-700">
              {session?.user?.name}
            </span>
          </div>
          
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}