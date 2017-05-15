import { Schema } from 'mongoose'
import { db } from 'providers/database'

const userSchema = new Schema(
  {
    profile_id: { type: String, index: true },
    provider_id: Number,
    username: String,
  },
  {
    collection: 'users',
    timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
  },
)

export const User = db.model('users', userSchema)
