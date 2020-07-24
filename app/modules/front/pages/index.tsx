import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { NAME_APP } from "app/utils/constantes"
import { getFrontLayout } from "../layouts/FrontLayout"
import { Card, CardContent, CardActions, Button } from "@material-ui/core"
import Posts from "../components/Listing/Posts"
import { Link } from "blitz"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
)

const HomePage = () => {
  const classes = useStyles()

  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>{NAME_APP}.</Typography>
              <Link href="artist/[id]/[slugArtist]" as="artist/456056/nox-974">
                <Button variant="contained" color="primary">
                  Go to profile page artist
                </Button>
              </Link>

              <Posts />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

HomePage.getLayout = getFrontLayout

export default HomePage
