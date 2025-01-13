import "@/styles/globals.css"
import {NextPage} from "next"
import type {AppProps} from "next/app"
import {ReactElement, ReactNode} from "react"
import {Geist} from "next/font/google"
import {setupStore} from "@/state/store"
import {Provider} from "react-redux"
import {ToastContainer} from "react-toastify"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  const renderComponent = (
    <>
      {getLayout(
        <Provider store={setupStore()}>
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      )}
    </>
  )
  return <div className={`${geistSans.variable}`}>{renderComponent}</div>
}
