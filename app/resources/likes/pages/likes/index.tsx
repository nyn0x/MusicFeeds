import React, { Suspense } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getLikes from "app/likes/queries/getLikes"

export const LikesList = () => {
  const [likes] = useQuery(getLikes, { orderBy: { id: "desc" } })

  return (
    <ul>
      {likes.map((like) => (
        <li key={like.id}>
          <Link href="/likes/[likeId]" as={`/likes/${like.id}`}>
            <a>{like.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const LikesPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Likes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Likes</h1>

        <p>
          {
            <Link href="/likes/new">
              <a>Create Like</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LikesList />
        </Suspense>
      </main>
    </div>
  )
}

export default LikesPage
