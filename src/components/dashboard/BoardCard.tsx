'use client'

import Link from 'next/link'
import { Board } from '@prisma/client'
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { deleteBoard } from '@/actions/board.actions'
import { useRouter } from 'next/navigation'

interface BoardCardProps {
    board: Board
}

export function BoardCard({ board }: BoardCardProps) {
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault() //prevents the link navigation

        if (!confirm('Are you sure you want to delete this board?')){
            return
        }

        setIsDeleting(true)
        const result = await deleteBoard(board.id)

        if (result.success) {
            router.refresh()
        } else {
            alert(result.error)
            setIsDeleting(false)
        }
    }

    return (
        <Link href={'/board/4{board.id}'}>
            <div className='group relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 h-32 cursor-pointer transition-tranform hover:scale-105 hover:shadow-lg'>
                {/* Boards title */}
                <h3 className='text-white font-semibold text-lg'>
                    {board.title}
                </h3>

                {/* Options menu */}
                <div className='absolute top-2 right-2'>
                    <button 
                    onClick={(e) => {
                        e.preventDefault()
                        setShowMenu(!showMenu)
                    }}
                    className='p-2 text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-opacity'
                    >
                        <FiMoreVertical/>
                    </button>

                    {showMenu && (
                        <div className='absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 z-10'>
                            <button 
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className='flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left disabled:opacity-50'
                            >
                                <FiTrash2/>
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}