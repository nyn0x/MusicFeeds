import db, { FindManyLikeArgs } from "db"

type GetLikesInput = {
  where?: FindManyLikeArgs["where"]
  orderBy?: FindManyLikeArgs["orderBy"]
  cursor?: FindManyLikeArgs["cursor"]
  take?: FindManyLikeArgs["take"]
  skip?: FindManyLikeArgs["skip"]
  // Only available if a model relationship exists
  // include?: FindManyLikeArgs['include']
}

export default async function getLikes(
  { where, orderBy, cursor, take, skip }: GetLikesInput,
  ctx: Record<any, any> = {}
) {
  const likes = await db.like.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return likes
}
