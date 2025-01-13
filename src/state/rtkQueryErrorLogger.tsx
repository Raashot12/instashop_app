import {isRejectedWithValue} from "@reduxjs/toolkit"
import type {MiddlewareAPI, Middleware} from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import {toast} from "react-toastify"

export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      if (action?.payload.status === 403) {
        toast.error(action.payload?.data?.error?.message, {
          position: "top-center",
        })
      }
      const loginPath = `${window.location.origin}/login`
      if (
        action?.payload?.status === 401 &&
        window.location.href !== loginPath
      ) {
        Cookies.remove("accessToken")
        window.location.href = loginPath
      }
    }

    return next(action)
  }
