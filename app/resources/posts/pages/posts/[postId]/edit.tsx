import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getPost from "app/posts/queries/getPost"
import updatePost from "app/posts/mutations/updatePost"
import PostForm from "app/posts/components/PostForm"

export const EditPost = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post, { mutate }] = useQuery(getPost, { where: { id: postId } })

  return (
    <div>
      <h1>Edit Post {post.id}</h1>
      <pre>{JSON.stringify(post)}</pre>

      <PostForm
        initialValues={post}
        onSubmit={async () => {
          try {
            const updated = await updatePost({
              where: { id: post.id },
              data: { name: "MyNewName" },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/posts/[postId]", `/posts/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating post " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditPostPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditPost />
        </Suspense>

        <p>
          {
            <Link href="/posts">
              <a>Posts</a>
            </Link>
          }
        </p>
      </main>
    </div>
  )
}

export default EditPostPage
