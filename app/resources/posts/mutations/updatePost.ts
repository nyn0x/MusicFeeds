import db, { PostUpdateArgs } from "db"

type UpdatePostInput = {
  where: PostUpdateArgs["where"]
  data: PostUpdateArgs["data"]
}

export default async function updatePost(
  { where, data }: UpdatePostInput,
  ctx: Record<any, any> = {}
) {
  // Don't allow updating
  delete data.id

  const post = await db.post.update({ where, data })

  return post
}
