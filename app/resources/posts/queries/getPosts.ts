import db, { FindManyPostArgs } from "db"
import { checkTakeArg, checkMaxDepth, checkMaliciousQuery } from "app/validators/prisma"

type GetPostsInput = {
  where?: FindManyPostArgs["where"]
  orderBy?: FindManyPostArgs["orderBy"]
  cursor?: FindManyPostArgs["cursor"]
  take?: FindManyPostArgs["take"]
  skip?: FindManyPostArgs["skip"]
  select?: FindManyPostArgs["select"]
  // Only available if a model relationship exists
  include?: FindManyPostArgs["include"]
}

export default async function getPosts(
  { where, orderBy, cursor, take, skip, select }: GetPostsInput,
  ctx: Record<any, any> = {}
) {
  checkMaliciousQuery({ take }, select)
  const posts = await db.post.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
    select,
  })

  return posts
}
