import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUserBoards } from '@/actions/board.actions'
import { BoardGrid } from '@/components/dashboard/BoardGrid'

export default async function DashBoardPage () {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('./login')
    }

    const result = await getUserBoards()
    const boards = result.success ? result.data || [] : []

    return (
        <div>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    You Boards
                </h1>
                <p className='text-gray-600'>
                    {boards.length == 0
                        ? 'Create your first board to start organizing your tasks'
                        : `You have ${boards.length} board${boards.length !== 1 ? 'S' : ''}`
                    }
                </p>
            </div>

            <BoardGrid boards={boards}/>
        </div>
    )
} 