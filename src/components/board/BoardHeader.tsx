'use client'

import { Board } from '@prisma/client'
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { updateBoard, deleteBoard } from '@/actions/board.actions'
import { useRouter } from 'next/navigation'

interface BoardHeaderProps {
    board:Board
}

export function BoardHeader({ board }: BoardHeaderProps) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(board.title)
    const [showMenu, setShowMenu] = useState(false)

    const handleUpdateTitle = async () => {
        if (title.trim() === board.title) {
            setIsEditing(false)
            return 
        }

        const result = await updateBoard({ id: board.id, title })
        if (result.success){
            setIsEditing(false)
            router.refresh()
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are ypu sure you want to delete this board?')) return

        const result = await deleteBoard(board.id)
        if(result.success) {
            router.push('./dashboard')
        }
    }

    return (
        <div className='bg-black/20 backfrop-blur-sm px-6 py-4 flex items-center justify-between'>
            {isEditing ? (
                <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleUpdateTitle}
                onKeyDown = {(e) => {
                    if(e.key === 'Enter') handleUpdateTitle()
                    if (e.key === 'Escape') {
                        setTitle(board.title)
                        setIsEditing(false)
                    }
                }} 
                className='bg-transparent text-white text-2xl font-bold border-2 border-white rounded px-2 py-1 focus:outline-none'
                autoFocus
                />
            ): (
                <h1
                onClick={() => setIsEditing(true)}
                className='text-2xl font-bold text-white cursor-pointer hover:bg-white/10 rounded px-2 py-1 transition-colors'
                >
                    {board.title}
                </h1>
            )}

            <div className='relative'>
                <button
                onClick={() =>  setShowMenu(!showMenu)}
                className='p-2 text-white hover:bg-white/20 rounded transition-colors'
                >
                    <FiMoreHorizontal size={20} />
                </button>

                {
                    showMenu && (
                        <div className='absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-48 z-10'>
                            <button
                            onClick={() => {
                                setIsEditing(true)
                                setShowMenu(false)
                            }}
                            className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                            >
                                <FiEdit2/>
                                Rename
                            </button>
                            <button
                            onClick={handleDelete}
                            className='flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left'
                            >
                                <FiTrash2/>
                                Delete board
                            </button>
                        </div>
                    )}
            </div>
        </div>
    )
}

