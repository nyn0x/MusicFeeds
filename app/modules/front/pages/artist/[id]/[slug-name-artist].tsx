import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { getFrontLayout } from "app/modules/front/layouts/FrontLayout"
import { InferGetServerSidePropsType } from "blitz"

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

const ProfileArtistPage = ({ profile }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles()
  console.log("profile", profile)
  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>profile page artist</Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

// export const getInitialProps = async () => {
//   console.log("yo")
//   const profile = {
//     id: "Nox Panda",
//     name: "Nox Panda",
//     slugName: "yolo",
//   }
//   return {
//     props: {
//       profile,
//     },
//   }
// }
function scaryClown() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("-----huhu-----")
    }, 2000)
  })
}

export const getServerSideProps = async () => {
  const msg = await scaryClown()
  console.log("Message:", msg)
  const profile = {
    id: "Nox Panda",
    name: "Nox Panda",
    slugName: "yolo",
  }
  return {
    props: {
      profile,
    },
  }
}

ProfileArtistPage.getLayout = getFrontLayout

export default ProfileArtistPage
