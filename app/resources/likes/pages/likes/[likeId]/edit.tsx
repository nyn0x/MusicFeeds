import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getLike from "app/likes/queries/getLike"
import updateLike from "app/likes/mutations/updateLike"
import LikeForm from "app/likes/components/LikeForm"

export const EditLike = () => {
  const router = useRouter()
  const likeId = useParam("likeId", "number")
  const [like, { mutate }] = useQuery(getLike, { where: { id: likeId } })

  return (
    <div>
      <h1>Edit Like {like.id}</h1>
      <pre>{JSON.stringify(like)}</pre>

      <LikeForm
        initialValues={like}
        onSubmit={async () => {
          try {
            const updated = await updateLike({
              where: { id: like.id },
              data: { name: "MyNewName" },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/likes/[likeId]", `/likes/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating like " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditLikePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Like</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditLike />
        </Suspense>

        <p>
          {
            <Link href="/likes">
              <a>Likes</a>
            </Link>
          }
        </p>
      </main>
    </div>
  )
}

export default EditLikePage
