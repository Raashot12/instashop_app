import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Onboarding from "../Onboarding"
import {toast} from "react-toastify"
import Image from "next/image"
import {imageUpload} from "../data"
import {useAppDispatch} from "../hooks"
import {setCurrentStep} from "@/state/onboardingSlice"

const storeFormSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  storeTag: z.string().min(1, "Store tag name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  email: z.string().email("Invalid email address"),
  category: z.string().min(1, "Category is required"),
})

type StoreFormValues = z.infer<typeof storeFormSchema>

const CreateStoreForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
    const file = e.target.files?.[0]

    if (!file) {
      toast.error("File error, kindly check file.", {
        position: "top-center",
      })
      return
    }

    if (file.size > maxSize) {
      toast.error("Sorry! File is larger than 5MB", {
        position: "top-center",
      })
      return
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("File error, kindly check file type.", {
        position: "top-center",
      })
      return
    }

    const imageUrl = URL.createObjectURL(file)

    setImagePreview(imageUrl)
    setImageFile(file)
  }
  const dispatch = useAppDispatch()

  const handleStepClick = (step: number) => {
    dispatch(setCurrentStep(step)) // Update the active step
  }
  const onSubmit = (data: StoreFormValues) => {
    if (!imageFile) {
      toast.error("Please upload a store logo", {
        position: "top-center",
      })
      return
    }
    console.log("Form Data:", data)
    console.log("Uploaded Image:", imageFile)
    toast.success("Form submitted successfully!", {
      position: "top-center",
    })
    handleStepClick(4)
  }

  return (
    <Onboarding
      rewindNumber={2}
      submitButton={
        <button
          type="submit"
          form="create-store-form"
          className="bg-[#8a226f] text-white w-full py-3 rounded-full"
        >
          Continue
        </button>
      }
    >
      <form
        id="create-store-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="py-[12px] px-[16px] cursor-pointer border border-solid border-[rgba(0, 0, 0, 0.2)] rounded-[12px] w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            {imagePreview ? (
              <div className="relative h-[80px] w-[80px]">
                <Image
                  src={imagePreview}
                  alt="Store Logo Preview"
                  className="absolute right-0 bottom-0"
                  width={80}
                  height={80}
                />
                <input
                  style={{
                    height: 80,
                    width: 80,
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                  }}
                  type="file"
                  accept=".jpeg,.jpg,.png"
                  name="file"
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <div className="relative h-[80px] w-[80px]">
                <Image
                  src={imageUpload}
                  alt="Upload Placeholder"
                  className="absolute right-0 bottom-0"
                  width={80}
                  height={80}
                />
                <input
                  style={{
                    height: 80,
                    width: 80,
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                  }}
                  type="file"
                  accept=".jpeg,.jpg,.png"
                  name="file"
                  onChange={handleImageUpload}
                />
              </div>
            )}

            <p className="text-[12px] font-[400] text-[#A6A6A6]">
              Upload store logo
            </p>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Store name"
            className={`w-full border border-gray-300 rounded-md h-[52px] px-3 placeholder-[rgba(0, 0, 0, 0.6)] ${
              errors.storeName?.message ? "border-red-600" : "border-gray-300"
            }`}
            {...register("storeName")}
          />
          {errors.storeName && (
            <p className="text-red-500 text-sm">{errors.storeName.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Store tag name"
            className={`w-full border border-gray-300 rounded-md h-[52px] px-3 placeholder-[rgba(0, 0, 0, 0.6)] ${
              errors.storeTag?.message ? "border-red-600" : "border-gray-300"
            }`}
            {...register("storeTag")}
          />
          {errors.storeTag && (
            <p className="text-red-500 text-sm">{errors.storeTag.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Store phone number"
            className={`w-full border border-gray-300 rounded-md h-[52px] px-3 placeholder-[rgba(0, 0, 0, 0.6)] ${
              errors.phoneNumber?.message ? "border-red-600" : "border-gray-300"
            }`}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Store email"
            className={`w-full border border-gray-300 rounded-md h-[52px] px-3 placeholder-[rgba(0, 0, 0, 0.6)] ${
              errors.email?.message ? "border-red-600" : "border-gray-300"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Category"
            className={`w-full border border-gray-300 rounded-md h-[52px] px-3 placeholder-[rgba(0, 0, 0, 0.6)] ${
              errors.category?.message ? "border-red-600" : "border-gray-300"
            }`}
            {...register("category")}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
      </form>
    </Onboarding>
  )
}

export default CreateStoreForm
