import mongoose, { Document, Model } from 'mongoose'

export interface GitHubUser {
  readonly id?: string
  githubId: number
  login: string
  avatar: string
  url: string
  repos: Repository[]
  name?: string
  company?: string
  blog: string
  location?: any
  email?: string
  followers: number
  following: number
}

interface Repository {
  name: string
  url: string
  description?: string
}

const Schema = new mongoose.Schema(
  {
    githubId: { type: Number, required: true },
    login: { type: String, required: true },
    avatar: { type: String, required: true },
    url: { type: String, required: true },
    repos: { type: Array, required: true, default: [] },
    name: { type: String },
    company: { type: String },
    blog: { type: String, default: '' },
    location: { type: String },
    email: { type: String },
    followers: { type: Number, required: true },
    following: { type: Number, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

interface GitHubUserModel extends Omit<GitHubUser, 'id'>, Document {}
export const GitHubUser: Model<GitHubUserModel> = mongoose.model(
  'GitHubUser',
  Schema
)
