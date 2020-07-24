import ReactPlayer from "react-player"
import CardContent from "@material-ui/core/CardContent"
import Card from "@material-ui/core/Card"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"
import LaunchIcon from "@material-ui/icons/Launch"
import IconButton from "@material-ui/core/IconButton"
import RemoveIcon from "@material-ui/icons/Remove"
import {
  selectPlayer,
  StatePlayer,
  DISPLAY_PLAYER,
  largePlayer,
  smallPlayer,
  noPlayer,
} from "app/redux/slices/playerSlice"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
// import { useWindowSize } from "app/utils/hooks/useWindowSize"
import classnames from "classnames"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-flex",
      // width: "250px",
    },
    backdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 5,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgb(0 0 0 / 63%)",
    },
    wrapperPlayer: {
      transition: "all 0.3s linear ",
      zIndex: 10,
      minHeight: "150px",
      minWidth: "275px",
    },
    wrapperPlayerLittle: {
      position: "fixed",
      top: "99%",
      left: "99%",
      transform: "translate(-100%, -100%)",
    },
    wrapperPlayerBig: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    cardcontent: {
      paddingTop: 0,
      padding: theme.spacing(2),
      "&:last-child": {
        paddingBottom: theme.spacing(2),
      },
    },
    actionsModal: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    largeIcon: {
      transform: "rotate(-90deg)",
    },
    reduceIcon: {},
    expanded: {
      width: "10rem",
      height: "10rem",
      backgroundColor: "navy",
      position: "relative",
      left: "-100%",
      top: "150%",
    },
    compact: {
      width: "3rem",
      height: "3rem",
      padding: "0.5rem",
      borderRadius: "1.5rem",
    },
    title: {
      color: "navy",
      fontWeight: 800,
      margin: "0",
    },
    expandedTitle: {
      fontSize: "5em",
      color: "white",
    },
    compactTitle: {
      fontSize: "1.5em",
    },
  })
)

const Player = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const closePlayer = () => {
    dispatch(noPlayer())
  }
  const enlargePlayer = () => {
    dispatch(largePlayer())
  }
  const reducePlayer = () => {
    dispatch(smallPlayer())
  }
  const statePlayer: StatePlayer = useSelector(selectPlayer)
  const isLargePlayer = statePlayer.display === DISPLAY_PLAYER.LARGE

  return (
    <>
      {statePlayer.display !== DISPLAY_PLAYER.NONE && (
        <>
          {isLargePlayer && <div className={classes.backdrop} onClick={reducePlayer} />}
          <div
            className={classnames(classes.wrapperPlayer, {
              [classes.wrapperPlayerBig]: isLargePlayer,
              [classes.wrapperPlayerLittle]: !isLargePlayer,
            })}
          >
            <Card className={classes.root}>
              <CardContent className={classes.cardcontent}>
                <div className={classes.actionsModal}>
                  {statePlayer.display === DISPLAY_PLAYER.LARGE && (
                    <IconButton onClick={reducePlayer} aria-label={"reduce player"}>
                      <RemoveIcon className={classes.reduceIcon} />
                    </IconButton>
                  )}
                  {statePlayer.display === DISPLAY_PLAYER.SMALL && (
                    <IconButton onClick={enlargePlayer} aria-label={"enlarge player"}>
                      <LaunchIcon className={classes.largeIcon} />
                    </IconButton>
                  )}
                  <IconButton onClick={closePlayer} aria-label={"close player"}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <ReactPlayer
                  controls={true}
                  playing={true}
                  url={statePlayer.url}
                  height={statePlayer.height}
                  width={statePlayer.width}
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  )
}

export default Player
