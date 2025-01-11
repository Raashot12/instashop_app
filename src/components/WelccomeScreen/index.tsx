import React from "react"
import {useRouter} from "next/router"
import CartBags from "../IconComponents/CartBags"
import IconChecked from "../IconComponents/IconChecked"

const WelcomeScreen: React.FC = () => {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/phone-email")
  }

  return (
    <div className="flex flex-col items-center font-[700] justify-center min-h-screen bg-white px-[45px] relative">
      <div className="mb-8">
        <CartBags />
      </div>
      <h1 className="text-2xl font-bold mb-2">Welcome</h1>
      <p className="text-center text-black font-normal mb-6">
        The safest platform to shop from social media vendors
      </p>
      <div className="bg-[#FFEAFA] py-[12px] px-[16]  border border-solid border-[#8A226F] rounded-[12] w-full flex items-center">
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
      <button
        className="bg-purple-600 text-white py-3 px-6 w-full rounded-full mt-[150px]"
        onClick={handleGetStarted}
      >
        Get started
      </button>
    </div>
  )
}

export default WelcomeScreen
