import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { NAME_APP } from "app/utils/constantes"
import { getFrontLayout } from "../layouts/FrontLayout"
import { Card, CardContent, CardActions, Button } from "@material-ui/core"

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
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="h2">
                    be nev lent
                  </Typography>
                  <Typography color="textSecondary">adjective</Typography>
                  <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button variant="contained" color="default">
                    Toggle Theme Type
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

HomePage.getLayout = getFrontLayout

export default HomePage
