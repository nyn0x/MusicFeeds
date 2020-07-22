import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getLike from "app/likes/queries/getLike"
import deleteLike from "app/likes/mutations/deleteLike"

export const Like = () => {
  const router = useRouter()
  const likeId = useParam("likeId", "number")
  const [like] = useQuery(getLike, { where: { id: likeId } })

  return (
    <div>
      <h1>Like {like.id}</h1>
      <pre>{JSON.stringify(like, null, 2)}</pre>

      {
        <Link href="/likes/[likeId]/edit" as={`/likes/${like.id}/edit`}>
          <a>Edit</a>
        </Link>
      }

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteLike({ where: { id: like.id } })
            router.push("/likes")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowLikePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Like</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          {
            <Link href="/likes">
              <a>Likes</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Like />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowLikePage
