import React, { Suspense } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getPosts from "app/posts/queries/getPosts"

export const PostsList = () => {
  const [posts] = useQuery(getPosts, { orderBy: { id: "desc" } })

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href="/posts/[postId]" as={`/posts/${post.id}`}>
            <a>{post.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const PostsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Posts</h1>

        <p>
          {
            <Link href="/posts/new">
              <a>Create Post</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PostsList />
        </Suspense>
      </main>
    </div>
  )
}

export default PostsPage
