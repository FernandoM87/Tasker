import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getBoardById } from '@/actions/board.actions'
import { BoardHeader } from '@/components/board/BoardHeader'
import { ListContainer } from '@/components/board/ListContainer'

interface BoardPageProps {
    params: {
        boardId: string
    }
}

export default async function BoardPage({ params }: BoardPageProps) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    //Obtain the board with list and cards
    const result = await getBoardById(params.boardId)

    if (!result.success || !result.data) {
        redirect('/dashboard')
    }

    const board = result.data

    return (
        <div
            className="h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
            style={{
                backgroundImage: board.imageUrl ? `url(${board.imageUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <BoardHeader board={board} />
            <ListContainer board={board} />
        </div>
    )
}