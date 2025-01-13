import React from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Onboarding from "../Onboarding"
import {setCurrentStep} from "@/state/onboardingSlice"
import { useAppDispatch } from "../hooks"

// Defination Zod schema
const phoneEmailSchema = z.object({
  input: z
    .string()
    .min(1, "This field is required")
    .refine(
      value =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10,15}$/.test(value),
      {
        message: "Enter a valid email or phone number",
      }
    ),
})

type PhoneEmailFormData = z.infer<typeof phoneEmailSchema>

const PhoneEmailScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PhoneEmailFormData>({
    resolver: zodResolver(phoneEmailSchema),
    mode: "all",
    reValidateMode: "onChange",
  })
  const dispatch = useAppDispatch()

  const handleStepClick = (step: number) => {
    dispatch(setCurrentStep(step)) // Update the active step
  }

  const onSubmit = (data: PhoneEmailFormData) => {
    console.log(data)
    handleStepClick(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Onboarding
        rewindNumber={0}
        submitButton={
          <button
            type="submit"
            className="bg-[#8a226f] text-white w-full py-3 rounded-full"
          >
            Continue
          </button>
        }
      >
        <div>
          <h2 className="text-[24px] font-[500] mb-4">
            Enter your phone number or email to get started
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            We will send you a verification code for confirmation
          </p>
          <input
            type="text"
            placeholder="Enter phone number or email"
            className={`w-full px-3 h-[52px] border rounded-md ${
              errors.input?.message ? "border-red-600" : "border-gray-300"
            }`}
            {...register("input")}
          />
          <p className="text-[12px] text-red-700 font-[500]">
            {errors.input?.message}
          </p>
        </div>
      </Onboarding>
    </form>
  )
}

export default PhoneEmailScreen
