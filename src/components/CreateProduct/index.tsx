import React from 'react'
import Onboarding from '../Onboarding'
import IconDraft from "../IconComponents/IconDraft"

const CreateProduct = () => {
  return (
    <Onboarding
      rewindNumber={3}
      verticalDot={true}
      title={"Create a product"}
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
      <div>
        <div className="flex justify-between items-center">
          <div  className='cursor-pointer'>
            <IconDraft />
          </div>
          <span className="font-[500] text-[12px] text-[#8a226f]">
            Preview product
          </span>
        </div>
      </div>
    </Onboarding>
  )
}

export default CreateProduct