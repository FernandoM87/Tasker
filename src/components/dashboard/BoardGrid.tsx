'use client'

import { Board } from '@prisma/client'
import { BoardCard } from './BoardCard'
import { CreateBoardButton } from './CreateBoardButton'

interface BoardGridProps {
    boards: Board[]
}

export function BoardGrid({ boards }: BoardGridProps) {
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {/* Existing Boards */}

            {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
            ))}

            {/* Button to create a new board */}
            <CreateBoardButton/>
        </div>
    )
}