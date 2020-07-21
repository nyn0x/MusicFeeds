import { useMemo, useEffect } from "react"
import {
  // createMuiTheme,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme, // (warning findNode..) https://github.com/mui-org/material-ui/issues/13394
} from "@material-ui/core/styles"
import { PaletteOptions } from "@material-ui/core/styles/createPalette"
import { useSelector } from "react-redux"
import { selectThemeMode } from "app/redux/slices/themeModeSlice"
import { useDispatch } from "react-redux"
import { setThemeMode } from "app/redux/slices/themeModeSlice"

// https://material-ui.com/customization/palette/#user-preference

const globalPalette: PaletteOptions = {
  primary: {
    light: "#ff635f",
    main: "#df2935",
    dark: "#a5000f",
    contrastText: "#fff",
  },
  secondary: {
    light: "#ff7961",
    main: "#801336",
    dark: "#ba000d",
    contrastText: "#000",
  },
}

const ThemePreference = ({ children }) => {
  const dispatch = useDispatch()
  // -- https://material-ui.com/customization/palette/#user-preference
  const themeMode = useSelector(selectThemeMode)
  let defaultState = {
    posts: [],
    themeMode: "light",
  }

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          ...globalPalette,
          type: themeMode,
        },
      }),
    [themeMode]
  )
  // -->

  useEffect(() => {
    try {
      const parsedState = JSON.parse(localStorage.getItem("state"))
      if (parsedState) {
        defaultState = parsedState
      }
      dispatch(setThemeMode(defaultState.themeMode))
    } catch (error) {
      localStorage.clear()
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}

export default ThemePreference
