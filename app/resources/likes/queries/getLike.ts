import db, { FindOneLikeArgs } from "db"

type GetLikeInput = {
  where: FindOneLikeArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneLikeArgs['include']
}

export default async function getLike(
  { where /* include */ }: GetLikeInput,
  ctx: Record<any, any> = {}
) {
  const like = await db.like.findOne({ where })

  return like
}
