import React from "react"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createLike from "app/likes/mutations/createLike"
import LikeForm from "app/likes/components/LikeForm"

const NewLikePage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Like</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New Like </h1>

        <LikeForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const like = await createLike({ data: { name: "MyName" } })
              alert("Success!" + JSON.stringify(like))
              router.push("/likes/[likeId]", `/likes/${like.id}`)
            } catch (error) {
              alert("Error creating like " + JSON.stringify(error, null, 2))
            }
          }}
        />

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

export default NewLikePage
