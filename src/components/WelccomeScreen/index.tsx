import React from "react"
import {useRouter} from "next/router"
import CartBags from "../IconComponents/CartBags"
import IconChecked from "../IconComponents/IconChecked"

const WelcomeScreen: React.FC = () => {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/onboarding")
  }

  return (
    <div className="flex flex-col max-w-sm mx-auto items-center justify-between font-[700] col min-h-screen py-3 bg-white px-[45px] relative">
      <div>
        <div className="mb-8">
          <CartBags />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">Welcome</h1>
        <p className="text-center text-black font-normal mb-6">
          The safest platform to shop from social media vendors
        </p>
        <div className="bg-[#FFEAFA] py-[12px] px-[16px] cursor-pointer border border-solid border-[#8A226F] rounded-[12px] w-full flex items-center">
          <ul className="text-left  space-y-3 text-black">
            <li className="flex items-center">
              <span className="mr-2">
                <IconChecked />
              </span>{" "}
              <p>Reach Millions of Shoppers</p>
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <IconChecked />
              </span>{" "}
              <p> Easy Product Listing</p>
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <IconChecked />
              </span>
              <p>Secure and Fast Payments</p>
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <IconChecked />
              </span>{" "}
              <p>Boost Your Visibility</p>
            </li>
          </ul>
        </div>
      </div>
      <button
        className="bg-[#8a226f] text-white w-full py-3 rounded-full"
        style={{boxShadow: "4px 8px 24px 0px rgba(254, 44, 85, 0.2)"}}
        onClick={handleGetStarted}
      >
        Get started
      </button>
    </div>
  )
}

export default WelcomeScreen
