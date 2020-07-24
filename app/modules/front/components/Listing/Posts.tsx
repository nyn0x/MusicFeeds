import React, { Suspense, useState } from "react"
import { Theme, createStyles, makeStyles, useTheme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import { useQuery, Link } from "blitz"
import getPosts from "app/resources/posts/queries/getPosts"
import WhatshotIcon from "@material-ui/icons/Whatshot"
import Badge from "@material-ui/core/Badge"
import { useInfiniteQuery } from "blitz"
import getInfinityPosts from "app/resources/posts/queries/getInfinityPosts"
import { getThumbnailVideoYT } from "app/utils/youtube"
import {
  largePlayer,
  DISPLAY_PLAYER,
  setUrlPlayer,
  selectPlayer,
  StatePlayer,
} from "app/redux/slices/playerSlice"
import { useSelector } from "react-redux"

import { useDispatch } from "react-redux"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginBottom: theme.spacing(2),
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    wrapperBurn: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      width: 200,
    },
    content: {
      flex: "1 0 auto",
      cursor: "pointer",
    },
    wrapperCover: {
      position: "relative",
      width: 152,
      height: 115,
    },
    cover: {
      position: "absolute",
      width: "100%",
      height: "100%",
      cursor: "pointer",
      backgroundSize: "cover",
    },
    controlOnCover: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    playIcon: {
      height: 38,
      width: 38,
      background: "rgb(223 41 53 / 50%)",
      borderRadius: "50%",
    },
    burnIcon: {
      height: 50,
      width: 50,
    },
  })
)

export const PostsList = () => {
  const dispatch = useDispatch()
  // const [
  //   groupedProducts,
  //   { isFetching, isFetchingMore, fetchMore, canFetchMore },
  // ] = useInfiniteQuery(
  //   getInfinityPosts,
  //   (page = { take: 2, skip: 0 }) => ({ where: { published: true }, ...page }),
  //   {
  //     getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage,
  //   }
  // )
  const [posts] = useQuery(
    getPosts,
    { orderBy: { id: "desc" }, include: { likes: {} } },
    { refetchOnWindowFocus: false }
  )
  const classes = useStyles()
  const statePlayer: StatePlayer = useSelector(selectPlayer)
  const playMedia = (url) => {
    dispatch(setUrlPlayer({ url }))

    if (statePlayer.display === DISPLAY_PLAYER.NONE) {
      dispatch(largePlayer())
    }
  }
  return (
    <>
      {/* {groupedProducts.map((group, i) => (
        <React.Fragment key={i}>
          {group.products.map((product) => (
            <p key={product.id}>{product.title}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button onClick={() => fetchMore()} disabled={!canFetchMore || !!isFetchingMore}>
          {isFetchingMore ? "Loading more..." : canFetchMore ? "Load More" : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingMore ? "Fetching..." : null}</div> */}
      <div>test</div>
      {posts.map((post) => (
        <Card key={post.id} className={classes.root}>
          <div
            role="button"
            className={classes.wrapperCover}
            tabIndex={0}
            onClick={() => {
              playMedia(post.urlDistant)
            }}
          >
            <CardMedia
              className={classes.cover}
              image={getThumbnailVideoYT(post.urlDistant)}
              title={post.title}
            />
            <div className={classes.controlOnCover}>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
            </div>
          </div>
          <div className={classes.details}>
            <CardContent
              className={classes.content}
              role="button"
              onClick={() => {
                playMedia(post.urlDistant)
              }}
              tabIndex={0}
            >
              <Typography component="h6" variant="h6">
                {post.title}
              </Typography>
            </CardContent>
          </div>

          <div className={classes.wrapperBurn}>
            <IconButton
              aria-label="like"
              role="button"
              tabIndex={0}
              onClick={() => {
                console.log("click on burn btn")
              }}
            >
              <Badge badgeContent={5} max={9999} color="primary">
                <WhatshotIcon className={classes.burnIcon} />
              </Badge>
            </IconButton>
          </div>
        </Card>
      ))}
    </>
  )
}

export default function Posts() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PostsList />
      </Suspense>
    </>
  )
}
