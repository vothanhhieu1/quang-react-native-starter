import 'react-redux'

export type User = {
  id: number
  fullName: string
  phone: string
  email: string
  username: string
  avatar: {
    src: string
  }
}

export type Token = {
  user: {
    bio: string
    email: string
    image: string
    token: string
    username: string
  }
}

export type Article = {
  author?: {
    bio?: string
    following: boolean
    image: string
    username: string
  }
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: string[]
  title: string
  updatedAt: string
}

export type Event = {
  id: number
  createdAt?: string
  updatedAt?: string
  name: Record<string, string> | string
  slug: string
  currency: string
  dateFrom: string
  dateTo: string
  isPublic: boolean
  presaleEnd: string
  presaleStart: string
  plugins: string
  live: boolean
  location: string
  dateAdmission: string
  comment: string
  hasSubevents: boolean
  testmode: boolean
  geoLat: string
  geoLon: string
  type: string
  description: string
  organizerId: number
  seatingPlanId: string
}

export type ArticleState = {
  count: number
  articles: Article[]
  current?: Article
  loading: boolean
}

export interface RootState {
  auth: {
    isLogin: boolean
    token?: Token
  }
  article: ArticleState
}

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
