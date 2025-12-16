'use client'

import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { createBoard } from '@/actions/board.actions'
import { useRouter } from 'next/navigation'

interface CreateBoardModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CreateBoardModal({isOpen, onClose}: CreateBoardModalProps) {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [error, setError] = useState ('')
    
    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        const result = await createBoard({ title })

        if (result.success) {
            setTitle('')
            onClose()
            router.refresh()
        } else {
            setError(result.error || 'Error creating board')
        }

        setIsLoading(false)
    }

    return(
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 '>
            <div className='bg-white rounded-lg p-6 w-full max-w-md'>

                {/* Header */}
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-semibold'> Create a new board</h2>
                    <button
                    onClick={onClose}
                    className='p-2 hover-bg-gray-100 rpunded'
                    >
                        <FiX/>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Boards title
                        </label>
                        <input
                         type="text"
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         placeholder='Designs project'
                         className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                         autoFocus
                         required
                         />
                    </div>

                    {error && (
                        <div className='mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm'>
                            {error}
                        </div>
                    )}

                    <div className='flex gap-3'>
                        <button
                        type='button'
                        onClick={onClose}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                        >
                            Cancel
                        </button>
                        <button
                        type='submit'
                        disabled={isLoading || !title.trim()}
                        className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed' 
                        >
                            {isLoading ? 'Creating' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}