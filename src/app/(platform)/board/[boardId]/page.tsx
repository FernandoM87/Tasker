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

    if(!session) {
        redirect('/login')
    }

    //Obtain the board with list and cards
    const result = await getBoardById(params.boardId)

    if(!result.success || !result.data) {
        redirect('/dashboard')
    }

    const board = result.data

    return (
        <div className='h-full flex flex-col'>
            {/* Board´s Header */}
            <BoardHeader board = {board}/>

            {/* list´s container */}
            <ListContainer board={board}/>
        </div>
    )
}