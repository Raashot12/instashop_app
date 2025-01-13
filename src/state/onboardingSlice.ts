import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import type {RootState} from "./store"

type Step = {
  currentStep: number
  totalSteps: number
}

const initialState = {
  currentStep: 1,
  totalSteps: 3,
}

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
  },
})

export const {setCurrentStep} = onboardingSlice.actions

export const selectOnboardingSteps = (state: RootState): Step =>
  state.onboarding

export default onboardingSlice.reducer
