import db, { FindManyPostArgs } from "db"

type GetPostsInput = {
  where?: FindManyPostArgs["where"]
  orderBy?: FindManyPostArgs["orderBy"]
  cursor?: FindManyPostArgs["cursor"]
  take?: FindManyPostArgs["take"]
  skip?: FindManyPostArgs["skip"]
  // Only available if a model relationship exists
  include?: FindManyPostArgs["include"]
}

export default async function getInfinityPosts({ where, orderBy, take, skip }: GetPostsInput) {
  const products = await db.post.findMany({
    where,
    orderBy,
    take,
    skip,
  })
  const count = await db.post.count()
  const hasMore = skip < count
  const nextPage = hasMore ? { take, skip: skip + take } : null
  return {
    products,
    nextPage,
  }
}
