import db, { LikeUpdateArgs } from "db"

type UpdateLikeInput = {
  where: LikeUpdateArgs["where"]
  data: LikeUpdateArgs["data"]
}

export default async function updateLike(
  { where, data }: UpdateLikeInput,
  ctx: Record<any, any> = {}
) {
  // Don't allow updating
  delete data.id

  const like = await db.like.update({ where, data })

  return like
}
