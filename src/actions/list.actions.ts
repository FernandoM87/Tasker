'use server'

import { revalidatePath } from "next/cache"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ActionResponse,
         List,
         CreateListInput,
         UpdateListInput } from "@/actions/types"
import { db } from "@/lib/db"


export async function createList(input: CreateListInput): Promise<ActionResponse<List>> {
    try{
        const session = await getServerSession(authOptions)
        if(!session?.user?.id) {
            return { success: false, error: 'No authenticated'}
        }

        //Verify that board belongs user

        const board = await db.board.findUnique({
            where: { id: input.boardId }
        })

        if (!board || board.userId !== session.user.id) {
            return { success: false, error: 'Board not found'}
        }

        const list = await db.list.create({
            data: {
                title: input.title.trim(),
                order: input.order,
                boardId: input.boardId
            }
        })

        revalidatePath(`/board/${input.boardId}`)
        return { success: true, data:list }
    } catch (error) {
        console.error('Error creating list:', error)
        return { success: false, error: 'Error creating list'}
    }
}

export async function updateList(input: { id: string; title: string }) : Promise<ActionResponse<List>> {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return { success: false, error: 'No authenticated'}
        }

        const list = await db.list.update({
            where: { id: input.id},
            data: {title: input.title.trim()}
        })

        revalidatePath(`/board/${list.boardId}`)
        return { success: true, data: list }
    } catch (error) {
        console.error('Error updating list:', error)
        return { success: false, error: 'Error updating list' }
    }
}

export async function deleteList(listId: string): Promise<ActionResponse> {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return { success: false, error: 'No authenticated' }
        }

        const list = await db.list.delete({
            where: { id:listId}
        })

        revalidatePath(`/board/${list.boardId}`)
        return { success: true}
    } catch (error) {
        console.error('Error deleting list:', error)
        return { success: false, error:'Error deleting list'}
    }
}