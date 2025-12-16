'use client'

import { BoardWithLists } from '@/types'
import { List } from './List'
import { AddListButton } from './AddListButton'


interface ListContainerProps {
    board: BoardWithLists
}

export function ListContainer({ board }: ListContainerProps) {
    return (
        <div className='flex-1 overflow-x-auto overflow-y-hidden p-6'>
            <div className='flex gap-4 h-full'>
                {/* Existing List */}
                {board.lists.map((list) => (
                    <List key={list.id} list={list} />
                ) )}

                {/* Button to add new list */}
                <AddListButton boardId={board.id} order={board.lists.length} />
            </div>

        </div>
    )
}