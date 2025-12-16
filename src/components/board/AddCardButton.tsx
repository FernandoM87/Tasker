'use client'

import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import { createCard } from '@/actions/card.actions'
import { useRouter } from 'next/navigation'

interface AddCardButtonProps {
    listId: string
    order: number
}

export function AddCardButton ({ listId, order }: AddCardButtonProps){
    const router = useRouter()
    const [isAdding, setIsAdding] = useState(false)
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        setIsLoading(true)
        const result = await createCard({title,  listId, order})

        if (result.success) {
            setTitle('')
            setIsAdding(false)
            router.refresh()
        }

        setIsLoading(false)
    }

    if(!isAdding) {
        return (
            <button
              onClick={() => setIsAdding(true)}
              className='w-full p-2 text-left text-sm text-gray-600 hover:bg-gray-200 rounded flex items-center gap-2 transition-colors'
            >
                <FiPlus size={16} />
            </button>
        )
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-2'>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              placeholder='Title of the card'
              className='w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'          
              autoFocus
            />

            <div className='flex gap-2'>
                <button
                  type='submit'
                  disabled={isLoading || !title.trim()}
                  className='px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50'
                >
                    {isLoading ? 'Adding' : 'Add'}
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setIsAdding(false)
                    setTitle('')
                  }}
                  className='px-3 py-1.5 hover:bg-gray-200 rounded text-sm transition-colors'
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}