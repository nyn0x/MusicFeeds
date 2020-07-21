import React, { useState } from "react"
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { Container, Tooltip, useTheme } from "@material-ui/core"
import { NAME_APP } from "app/utils/constantes"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import { useDispatch } from "react-redux"
import { toggle } from "app/redux/slices/themeModeSlice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      margin: "auto",
    },
    sectionNavbar: {
      display: "flex",
    },
    toolbar: {
      display: "flex",
      flexDirection: "column",
    },
    firstMenu: {
      width: "100%",
      margin: "auto",
      display: "flex",
      position: "relative",
      alignItems: "center",
    },
  })
)

export default function NavbarFront() {
  const classes = useStyles()

  const theme = useTheme()
  const dispatch = useDispatch()
  // SWITCHER THEME
  const handleTogglePaletteType = () => {
    dispatch(toggle())
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <div className={classes.firstMenu}>
              <Typography className={classes.title} variant="h6" noWrap>
                {NAME_APP}
              </Typography>
              {/* <div className={classes.grow} /> */}
              <div className={classes.sectionNavbar}>
                <Tooltip title={"todo"} enterDelay={300}>
                  <IconButton
                    color="inherit"
                    onClick={handleTogglePaletteType}
                    aria-label={"todo"}
                    data-ga-event-category="header"
                    data-ga-event-action="dark"
                  >
                    {theme.palette.type === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
