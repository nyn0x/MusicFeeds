import db, { FindManyPostArgs } from "db"
import { checkTakeArg } from "app/validators/prisma"

type GetPostsInput = {
  where?: FindManyPostArgs["where"]
  orderBy?: FindManyPostArgs["orderBy"]
  cursor?: FindManyPostArgs["cursor"]
  take?: FindManyPostArgs["take"]
  skip?: FindManyPostArgs["skip"]
  // Only available if a model relationship exists
  include?: FindManyPostArgs["include"]
}

export default async function getPosts(
  { where, orderBy, cursor, take, skip }: GetPostsInput,
  ctx: Record<any, any> = {}
) {
  checkTakeArg(take)
  const posts = await db.post.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return posts
}
