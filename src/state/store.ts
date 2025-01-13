import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {baseApi as api} from "./baseApi"
import onboardingSlice from "./onboardingSlice"
// Combine reducers
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  onboarding: onboardingSlice,
})

// Setup the store
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware),
  })
}

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>

// Define the AppStore type
export type AppStore = ReturnType<typeof setupStore>

// Define the AppDispatch type
export type AppDispatch = AppStore["dispatch"]
