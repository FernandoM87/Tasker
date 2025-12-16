'use client'

import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import { CreateBoardModal } from './CreateBoardModal'

export function CreateBoardButton() {
    const [isOpen, setIsOpen] = useState(false)

    return(
        <>
        <button 
        onClick={() => setIsOpen(true)}
        className='bg-gray-200 hover:bg-gray-300 rounded-lg p-6 h-32 felx items-center gap-2 text-gray-700 font-medium transition-colors'
        >
            <FiPlus className='text-xl'/>
            Create a new board
        </button>

        <CreateBoardModal
        isOpen={isOpen}
        onClose= {() => setIsOpen(false)}
        />
        </>
    )
}
