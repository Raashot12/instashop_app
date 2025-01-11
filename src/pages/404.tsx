import Footer from "@/components/HeaderAndFooter/Footer"
import {useRouter} from "next/router"
import React from "react"

const PageNotFound = () => {
  const router = useRouter()
  return (
    <>
      <section
        style={{
          minHeight: "calc(100vh - 52px)",
        }}
        className={`flex flex-col items-center justify-center bg-gray-50`}
      >
        <p className={`text-lg text-gray-600`}>
          Ooop! Page not found.{" "}
          <a style={{cursor: "pointer"}} onClick={() => router.back()}>
            Go Back
          </a>
        </p>
      </section>
      <Footer />
    </>
  )
}

export default PageNotFound
