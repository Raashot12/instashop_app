import React from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Onboarding from "../Onboarding"
import InstagramIcon from "../IconComponents/Instagram"
import IconTiktok from "../IconComponents/IconTiktok"
import IconGoogle from "../IconComponents/IconGoogle"
import { useAppDispatch } from "../hooks"
import { setCurrentStep } from "@/state/onboardingSlice"

// Define Zod schema for validation
const profileSetupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  phoneNumber: z
    .string()
    .regex(/^\d{10,15}$/, "Phone number must be 10 to 15 digits long"),
  email: z.string().email("Enter a valid email address"),
})

type ProfileSetupFormData = z.infer<typeof profileSetupSchema>

const ProfileSetupScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    mode: "all",
    reValidateMode: "onChange",
  })
  const dispatch = useAppDispatch()

  const handleStepClick = (step: number) => {
    dispatch(setCurrentStep(step)) // Update the active step
  }
  const onSubmit = (data: ProfileSetupFormData) => {
    console.log("Form submitted:", data)
    handleStepClick(3)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Onboarding
        rewindNumber={1}
        submitButton={
          <button
            type="submit"
            className="bg-[#8a226f] text-white w-full py-3 rounded-full"
            style={{boxShadow: "4px 8px 24px 0px rgba(254, 44, 85, 0.2)"}}
          >
            Continue
          </button>
        }
      >
        <div>
          <h2 className="text-[24px] font-[500] mb-4">
            Complete profile setup
          </h2>
          <div>
            <p className="text-gray-600 text-sm mb-3">
              Connect your socials for quick setup
            </p>
            <div className="flex space-x-3 mb-5">
              <button className="bg-[#F7f7f7] p-3 w-full flex justify-center items-center rounded-[12px]">
                <InstagramIcon />
              </button>
              <button className="bg-[#F7f7f7] p-3 w-full flex justify-center items-center rounded-[12px]">
                <IconTiktok />
              </button>
              <button className="bg-[#F7f7f7] p-3 w-full flex justify-center items-center rounded-[12px]">
                <IconGoogle />
              </button>
            </div>
            <p className="text-[rgba(0, 0, 0, 0.6)] text-sm mb-4">
              Or enter manually
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  className={`w-full px-3 h-[52px] border rounded-md ${
                    errors.fullName ? "border-red-600" : "border-gray-300"
                  }`}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-[12px] text-red-700 font-[500]">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className={`w-full px-3 h-[52px] border rounded-md ${
                    errors.username ? "border-red-600" : "border-gray-300"
                  }`}
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-[12px] text-red-700 font-[500]">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone number"
                  className={`w-full px-3 h-[52px] border rounded-md ${
                    errors.phoneNumber ? "border-red-600" : "border-gray-300"
                  }`}
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-[12px] text-red-700 font-[500]">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full px-3 h-[52px] border rounded-md ${
                    errors.email ? "border-red-600" : "border-gray-300"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[12px] text-red-700 font-[500]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Onboarding>
    </form>
  )
}

export default ProfileSetupScreen
