import CreateProduct from "@/components/CreateProduct"
import CreateStoreForm from "@/components/CreateStoreForm"
import {useAppSelector} from "@/components/hooks"
import PhoneEmailScreen from "@/components/PhoneEmail"
import ProductDetails from "@/components/ProductDetails"
import ProfileSetupScreen from "@/components/ProfileSetup"
import {selectOnboardingSteps} from "@/state/onboardingSlice"
import React from "react"

const OnboardingPage = () => {
  const onboardingObject = useAppSelector(selectOnboardingSteps)

  return (
    <div>
      <>{onboardingObject?.currentStep === 1 && <PhoneEmailScreen />}</>
      <>{onboardingObject?.currentStep === 2 && <ProfileSetupScreen />}</>
      <>{onboardingObject?.currentStep === 3 && <CreateStoreForm />}</>
      <>{onboardingObject?.currentStep === 4 && <CreateProduct />}</>
      <>{onboardingObject?.currentStep === 5 && <ProductDetails />}</>
    </div>
  )
}

export default OnboardingPage
