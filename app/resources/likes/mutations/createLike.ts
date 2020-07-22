import db, { LikeCreateArgs } from "db"

type CreateLikeInput = {
  data: LikeCreateArgs["data"]
}
export default async function createLike({ data }: CreateLikeInput, ctx: Record<any, any> = {}) {
  const like = await db.like.create({ data })

  return like
}
