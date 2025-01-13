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
  title = "Get started",
}: {
  children: React.ReactNode
  submitButton: React.ReactElement
  rewindNumber?: number
  verticalDot?: boolean
  title?: string
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
        <div className="w-full flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (rewindNumber === 0) {
                router.push("/")
              } else {
                dispatch(setCurrentStep(rewindNumber as number))
              }
            }}
          >
            <IconArrowBack />
            <button className="text-black text-[16px] font-[500]">{title}</button>
          </div>
          {verticalDot && (
            <div className="cursor-pointer">
              <IconVerticalDot />
            </div>
          )}
        </div>
        {!verticalDot && (
          <Stepper
            steps={onboardingObject.totalSteps}
            currentStep={onboardingObject.currentStep}
            onStepClick={handleStepClick}
          />
        )}
        <div className="">{children}</div>
      </div>
      {submitButton}
    </div>
  )
}

export default Onboarding
