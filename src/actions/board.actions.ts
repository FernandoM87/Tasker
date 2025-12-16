'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import {
    ActionResponse,
    Board,
    BoardWithLists,
    CreateBoardInput,
    UpdateBoardInput
} from '@/actions/types'


/* 
    Obtaining all the user boards 
*/

export async function getUserBoards(): Promise<ActionResponse<Board[]>> {
    try {
        const session = await getServerSession(authOptions)

        if(!session?.user?.id) {
            return { success: false, error: 'Not authenticated'}
        }

        const boards = await db.board.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return {success: true, data: boards }
    } catch (error) {
        console.error('Error obtaining boards', error)
        return { success: false, error: 'Error obtaining boards'}
    }
}


/* 
    Obtaining a specific board on lists and cards 
*/

export async function getBoardById(boardId: string): Promise<ActionResponse<BoardWithLists>> {
    try {
        const session = await getServerSession(authOptions)

        if(!session?.user?.id) {
            return { success: false, error:'Not authenticated'}
        }

        const board = await db.board.findUnique({
            where: {
                id: boardId,
                userId: session.user.id
            },
            include: {
                lists:{
                    orderBy: { order: 'asc' },
                    include: {
                        cards: {
                            orderBy: { order: 'asc' }
                        }
                    }
                }
            }
        })

        if (!board) {
            return { success: false, error:'Board not found' }
        }

        return { success: true, data: board }
    } catch (error) {
        console.error('Error obtaining board', error)
        return { success: false, error: 'Error obtaining board'}
    }
}

/* 
    Create a new Board
*/

export async function createBoard(input: CreateBoardInput): Promise<ActionResponse<Board>> {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return { success: false, error: 'Not authenticated' }
        }

        //Basic validation
        if (!input.title || input.title.trim().length === 0) {
            return { success: false, error: 'Title is required' }
        }

        const board = await db.board.create({
            data: {
                title: input.title.trim(),
                imageUrl: input.imageUrl,
                userId: session.user.id
            } 
        })

        //Revalidate the dashboard page cache
        revalidatePath('/dashboard')

        return { success: true, data: board }
    } catch (error) {
        console.error('Error creating board:', error)
        return { success: false, error: 'Error creating board' }
    }
}

/* 
    Update board
*/

export async function updateBoard(input: UpdateBoardInput): Promise<ActionResponse<Board>> {
    try{
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return { success: false, error:'Not authenticated' }
        } 

        // verify that the board belongs to the user

        const existingBoard = await db.board.findUnique({
            where: { id:input.id }
        })

        if (!existingBoard || existingBoard.userId !== session.user.id) {
            return { success: false, error:'Board not found' }
        }

        const board = await db.board.update({
            where: { id: input.id },
            data:{
                ...(input.title && { title: input.title.trim() }),
                ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl })
            }
        })

        revalidatePath('/dashboard')
        revalidatePath(`/board/${input.id}`)

        return { success: true, data:board }
    } catch (error) {
        console.error('Error updating board:', error)
        return { success: false, error: 'Error updating board' }
    }
}


export async function deleteBoard(boardId: string): Promise<ActionResponse> {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return { success: false, error: 'No authenticated' }
        }

        //verify property

        const board = await db.board.findUnique({
            where: { id: boardId }
        })

        if (!board || board.userId !== session.user.id) {
            return { success: false, error: 'Board not found' } 
        }

        await db.board.delete({
            where: { id: boardId }
        })

        revalidatePath('/dashboard')

        return { success: true }
    } catch (error) {
        console.error('Error deleting board:', error)
        return { success: false, error: 'Error deleting board' }
    }
}