export interface Blogs {
    id: number
    title: string
    body: string
    pictureUrl: string
    slug: string
    createdAt: string
    userId: number
    user: User
}

export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
}