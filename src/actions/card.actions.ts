'use server'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { ActionResponse,
         Card,
         CreateCardInput,
         UpdateCardInput } from '@/actions/types'

export async function createCard(input: CreateCardInput): Promise<ActionResponse<Card>> {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return { success: false, error :'No authenticated'}
        }

        const card = await db.card.create({
            data: {
                title: input.title.trim(),
                order: input.order,
                listId: input.listId
            },
            include: { list: true}
        })

        revalidatePath(`/board/${card.list.boardId}`)
        return { success: true, data: card }
    } catch (error) {
        console.error('Error creating card:', error)
        return { success: false, error: 'Error creating card'}
    }   
}

export async function deleteCard(cardId: string): Promise<ActionResponse> {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return { success: false, error: 'No authenticated'}
        }

        const card = await db.card.delete({
            where: { id: cardId},
            include: { list:true}
        })

        revalidatePath(`/board/${card.list.boardId}`)
        return { success: true}
    } catch (error) { 
        console.error('Error deleting card:', error)
        return { success: false, error: 'Error deleting card'}
    }
}