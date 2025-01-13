import React from "react"

interface StepperProps {
  steps: number
  currentStep: number
  onStepClick: (step: number) => void
}

const Stepper: React.FC<StepperProps> = ({steps, currentStep, onStepClick}) => {
  return (
    <div className="flex items-center w-full py-4 space-x-2">
      {Array.from({length: steps}).map((_, index) => (
        <div
          key={index}
          onClick={() => onStepClick(index + 1)}
          className={`flex-1 h-1 cursor-pointer rounded-full ${
            index < currentStep ? "bg-[#8a226f]" : "bg-[#E5E5E5]"
          }`}
        />
      ))}
    </div>
  )
}

export default Stepper
