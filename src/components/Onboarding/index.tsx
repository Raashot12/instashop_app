import React from "react"
import IconArrowBack from "../IconComponents/IconArrowBack"
import Stepper from "../Stepper"
import {selectOnboardingSteps, setCurrentStep} from "@/state/onboardingSlice"
import {useAppDispatch, useAppSelector} from "../hooks"
import {useRouter} from "next/router"
import IconVerticalDot from "../IconComponents/IconVerticalDot"

const Onboarding = ({
  children,
  submitButton,
  rewindNumber,
  verticalDot,
}: {
  children: React.ReactNode
  submitButton: React.ReactElement
  rewindNumber?: number
  verticalDot?: boolean
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const onboardingObject = useAppSelector(selectOnboardingSteps)
  const handleStepClick = (step: number) => {
    dispatch(setCurrentStep(step)) // Update the active step
  }
  return (
    <div className="flex flex-col w-full max-w-sm mx-auto justify-between bg-white min-h-screen pb-3 pt-3 px-3">
      <div>
        <div className="w-full flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer mb-4"
            onClick={() => {
              if (rewindNumber === 0) {
                router.push("/")
              } else {
                console.log("1111")
                dispatch(setCurrentStep(rewindNumber as number))
              }
            }}
          >
            <IconArrowBack />
            <button className="text-black text-sm font-[500]">
              Get Started
            </button>
          </div>
          {verticalDot && <IconVerticalDot />}
        </div>
        <Stepper
          steps={onboardingObject.totalSteps}
          currentStep={onboardingObject.currentStep}
          onStepClick={handleStepClick}
        />
        <div className="">{children}</div>
      </div>
      {submitButton}
    </div>
  )
}

export default Onboarding
