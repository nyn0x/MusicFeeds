import { AppProps, Head, useRouter } from "blitz"
import { useEffect, useMemo, useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { NoSsr, useMediaQuery } from "@material-ui/core"
import SiteLayout from "app/layouts/SiteLayout"
import { Provider as ReduxProvider, useSelector } from "react-redux"
import store from "app/store"
import ThemePreference from "app/components/ThemePreference"

/**
 * Pour fixer les warning/errors de css non identique entre le server et client
 * https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
 * https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
 */

export default function MyApp({ Component, pageProps, router }: AppProps) {
  // const router = useRouter()
  let pathsWithoutSsr = ["dashboard", "editor"]
  const withSsr = pathsWithoutSsr.find((p) => router.route.indexOf(`/${p}`) > -1) ? true : false

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const getLayout = Component["getLayout"] || ((page) => <SiteLayout children={page} />)

  return (
    <>
      <ReduxProvider store={store}>
        <ThemePreference>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. Global reset like normalize.css */}
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemePreference>
      </ReduxProvider>
    </>
  )
}
