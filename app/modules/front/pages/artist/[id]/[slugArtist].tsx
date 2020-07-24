import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { getFrontLayout } from "app/modules/front/layouts/FrontLayout"
import { InferGetServerSidePropsType, useQuery, useParam } from "blitz"
import Paper from "@material-ui/core/Paper"
import CardMedia from "@material-ui/core/CardMedia"

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
    media: {
      height: 370,
      backgroundSize: "cover",
    },
  })
)

const ProfileArtistPage = ({ profile }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles()
  const { id, slugArtist } = profile
  console.log("profile", profile)

  return (
    <>
      <div>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          title="Contemplative Reptile"
        />
      </div>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <Typography>profile page artist</Typography>
                <Typography>{id}</Typography>
                <Typography>{slugArtist}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

function scaryClown() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("-----huhu-----")
    }, 500)
  })
}

export const getServerSideProps = async (ctx) => {
  const { params } = ctx
  const msg = await scaryClown()
  console.log("Message:", msg, params)
  const profile = {
    name: "Nox Panda",
    ...params,
  }

  return {
    props: {
      profile,
    },
  }
}

ProfileArtistPage.getLayout = getFrontLayout

export default ProfileArtistPage
