'use client'

import { ListWithCards } from '@/types'
import { Card } from './Card'
import { AddCardButton } from './AddCardButton'
import { FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { deleteList, updateList } from '@/actions/list.actions'
import { useRouter } from 'next/navigation'

interface ListProps {
    list: ListWithCards
}

export function List({ list }: ListProps) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(list.title)
    const [showMenu, setShowMenu] = useState(false)

    const handleUpdateTitle = async () => {
        if (title.trim() === list.title) {
            setIsEditing(false)
            return
        }

        const result = await updateList({ id: list.id, title })
        if (result.success) {
            setIsEditing(false)
            router.refresh()
        }
    }

    const handleDelete = async () => {
        if(!confirm('Do you want to delete this list?')) return
        
        const result = await deleteList((list.id))
        if(result.success) {
            router.refresh()
        }
    }

    return (
        <div className='bg-gray-100 rounded-lg w-72 flex-shrink-0 flex flex-col max-h-full'>
            {/* List´s header */}
            <div className='p-3 flex items-center justify-between'>
                {isEditing ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={handleUpdateTitle}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') handleUpdateTitle()
                          if (e.key === 'Escape') {
                              setTitle(list.title)
                              setIsEditing(false)
                          }
                      }}
                      className='font-semibold text-sm bg-white border-2 border-blue-500 rounded px-2 py-1 w-full focus:outline-none'
                      autoFocus
                    />
                ): (
                    <h3
                    onClick={() => setIsEditing(true)}
                    className='font-semibold text-sm text-gray-800 cursor-pointer hover:bg-gray-200 rounded px-2 py-1 flex-1'
                    >
                        {list.title}
                    </h3>
                )}

                <div className='relative'>
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className='p-1 hover:bg-gray-200 rounded'
                    >
                        <FiMoreHorizontal size={16}/>
                    </button>

                    {showMenu && (
                        <div className='absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-40 z-10'>
                            <button
                              onClick={handleDelete}
                              className='flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left'
                            >
                                <FiTrash2 />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Cards */}
            <div className='flex-1 overflow-y-auto px-3 pb-3 space-y-2'>
                {list.cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}

                <AddCardButton listId={list.id} order={list.cards.length} />
            </div>
        </div>
    )
}