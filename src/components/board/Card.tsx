'use client'

import { Card as CardType } from '@prisma/client'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { deleteCard } from '@/actions/card.actions'
import { useRouter } from 'next/navigation'


interface CardProps {
    card: CardType
} 

export function Card({ card }: CardProps) {
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)

    const handleDelete = async () => {
        if(!confirm('Dou you want to delete this card?')) return

        const result = await deleteCard(card.id)
        if(result.success) {
            router.refresh()
        }
    }

    return (
        <div 
          className='bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow group'
          onClick={() => setShowMenu(!showMenu)}
          >
            <div className='flex items-start justify-between gap-2'>
                <p className='text-sm text-gray-800 flex-1'>
                    {card.title}
                </p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete()
                  }}
                  className='opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity'
                >
                    <FiTrash2 size={14} className='text-red-600'/>
                </button>
            </div>
            {card.description && (
                <p className='text-xs text-gray-500 mt-2 line-clamp-2'>
                    {card.description}
                </p>
            )}
        </div>
    )
}