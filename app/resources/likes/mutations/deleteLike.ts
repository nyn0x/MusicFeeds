import db, { LikeDeleteArgs } from "db"

type DeleteLikeInput = {
  where: LikeDeleteArgs["where"]
}

export default async function deleteLike({ where }: DeleteLikeInput, ctx: Record<any, any> = {}) {
  const like = await db.like.delete({ where })

  return like
}
