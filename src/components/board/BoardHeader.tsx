'use client'

import { Board } from '@prisma/client'
import { useState } from 'react'
import { updateBoard, deleteBoard } from '@/actions/board.actions'
import { useRouter } from 'next/navigation'
import { FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'

interface BoardHeaderProps {
  board: Board
}

export function BoardHeader({ board }: BoardHeaderProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(board.title)
  const [showMenu, setShowMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleUpdateTitle = async () => {
    if (title.trim() === board.title || !title.trim()) {
      setIsEditing(false)
      setTitle(board.title)
      return
    }
    
    setIsLoading(true)
    const result = await updateBoard({ id: board.id, title: title.trim() })
    
    if (result.success) {
      setIsEditing(false)
      router.refresh() // ← IMPORTANTE: Refresca los datos
    } else {
      alert(result.error)
      setTitle(board.title) // Revierte el cambio
    }
    
    setIsLoading(false)
  }
  
  const handleDelete = async () => {
    if (!confirm('¿Are you sure do you want to delete this board? All list and cards will be delete.')) {
      return
    }
    
    setIsLoading(true)
    const result = await deleteBoard(board.id)
    
    if (result.success) {
      router.push('/dashboard')
      router.refresh()
    } else {
      alert(result.error)
      setIsLoading(false)
    }
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdateTitle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUpdateTitle()
            if (e.key === 'Escape') {
              setTitle(board.title)
              setIsEditing(false)
            }
          }}
          disabled={isLoading}
          className="bg-white text-gray-800 text-2xl font-bold border-2 border-blue-500 rounded px-3 py-1 focus:outline-none disabled:opacity-50"
          autoFocus
        />
      ) : (
        <h1 
          onClick={() => !isLoading && setIsEditing(true)}
          className={`text-2xl font-bold text-white px-3 py-1 rounded transition-colors ${
            isLoading ? 'opacity-50' : 'cursor-pointer hover:bg-white/10'
          }`}
        >
          {board.title}
        </h1>
      )}
      
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          disabled={isLoading}
          className="p-2 text-white hover:bg-white/20 rounded transition-colors disabled:opacity-50"
        >
          <FiMoreHorizontal size={20} />
        </button>
        
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl py-2 w-48 z-20">
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left disabled:opacity-50"
              >
                <FiTrash2 />
                {isLoading ? 'Deleting...' : 'Delete board'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}