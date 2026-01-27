'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiTrello } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { Board } from '@prisma/client'
import { getUserBoards } from '@/actions/board.actions'

export function Sidebar() {
  const pathname = usePathname()
  const [ boards, setBoards ] = useState<Board[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const loadBoards = async () => {
      const result = await getUserBoards()
      if (result.success && result.data) {
        setBoards(result.data)
      }
      setIsLoading(false)
    }
    
    loadBoards()
  }, [])

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl ml-2 font-bold">Tasker</h2>
      </div>
      
      <nav className="space-y-6 flex-1 overflow-y-auto">
        {/* Dashboard */}
        <div>
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === '/dashboard'
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <FiHome className="text-xl" />
            Dashboard
          </Link>
        </div>
        
        {/* Lista de Boards */}
        <div>
          <div className="flex items-center gap-2 px-4 mb-2">
            <FiTrello className="text-lg text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-400 uppercase">
              Your Boards
            </h3>
          </div>
          
          <div className="space-y-1">
            {isLoading ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                Loading...
              </div>
            ) : boards.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                Without boards
              </div>
            ) : (
              boards.map((board) => (
                <Link
                  key={board.id}
                  href={`/board/${board.id}`}
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    pathname === `/board/${board.id}`
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {board.title}
                </Link>
              ))
            )}
          </div>
        </div>
      </nav>
    </aside>
  )
}