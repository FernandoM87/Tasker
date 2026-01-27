import { Board, List, Card } from '@prisma/client'

export type { Board, List, Card }

export type BoardWithLists = Board & {
    lists: ListWithCards []
}


export type  ListWithCards = List & {
    cards: Card[]
}

export type CreateBoardInput = {
    title: string
    imageUrl?: string 
}

export type UpdateBoardInput = {
    id: string
    title?: string
    imageUrl?: string
}

export type CreateListInput = {
    title: string 
    boardId: string
    order: number
}

export type UpdateListInput = {
    id: string
    title?: string
    order?: number
}

export type CreateCardInput = {
    title: string
    listId: string
    order: number
}

export type UpdateCardInput = {
    id: string
    title?: string
    description?: string
    order?: number
    listId?: string
}

export type ActionResponse<T = void> = {
    success: boolean
    data?: T
    error?: string
}