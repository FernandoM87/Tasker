'use client'

import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import { createList } from '@/actions/list.actions'
import { useRouter } from 'next/navigation'


interface AddListButtonProps {
    boardId: string
    order:number
}

export function AddListButton({ boardId, order }: AddListButtonProps) {
    const router = useRouter()
    const [isAdding, setIsAdding] = useState(false)
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        setIsLoading(true)
        const result = await createList({ title, boardId, order })

        if (result.success) {
            setTitle('')
            setIsAdding(false)
            router.refresh()
        }

        setIsLoading(fasle)
    }

    if(!isAdding) {
        return (
            <button
              onClick={() => setIsAdding(true)}
              className='bg-white/20 hover:bg-white/30 rounded-lg p-3 w-72 flex-shrink-0 flex items-center gap-2 text-white font-medium transition-colors'>
                <FiPlus />
                Add List
              </button>
        )
    }

    return (
        <div className='bg-gray-100 rounded-lg p-3 w-72 flex-shrink-0'>
            <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='List´s title...'
                  className='w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"'
                  autoFocus
                />

                <div className='flex gap-2'>
                    <button
                      type='submit'
                      disabled={isLoading || !title.trim()}
                      className='px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50'
                      >
                        {isLoading ? 'Creating...' : 'Add'}
                      </button>
                      <button
                      type='button'
                      onClick={() => {
                        setIsAdding(false)
                        setTitle('')
                      }}
                      className='px-4 py-2 hover:bg-gray-200 rounded text-sm transition-colors'
                      >
                        Cancel
                      </button>
                </div>
            </form>
        </div>
    )

}