import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUserBoards } from '@/actions/board.actions'
import { BoardGrid } from '@/components/dashboard/BoardGrid'

export default async function DashBoardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('./login')
    }

    const result = await getUserBoards()
    const boards = result.success ? result.data || [] : []

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-3xl text-center font-bold text-white my-2">
                    Welcome, {session.user?.name}!
                </h1>
                <p className="text-center text-xl text-white">
                    {boards.length === 0
                        ? 'Create your first board to start'
                        : `You have ${boards.length} board${boards.length !== 1 ? 's' : ''}`
                    }
                </p>
            </div>

            <BoardGrid boards={boards} />
        </div>
    )
} 