import React from 'react'
import Onboarding from '../Onboarding'

const CreateProduct = () => {
  return (
    <Onboarding
      rewindNumber={3}
      verticalDot={true}
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
      index
    </Onboarding>
  )
}

export default CreateProduct