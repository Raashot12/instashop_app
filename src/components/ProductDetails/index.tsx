import React, {useState} from "react"
import Onboarding from "../Onboarding"
import IconDraft from "../IconComponents/IconDraft"
import Accordion from "../Accordion"
import IconUpload from "../IconComponents/IconUpload"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import Image from "next/image"

type FormData = {
  productTitle: string
  productDescription: string
  price: string
  oldPrice: string
  productCollection: string
  inventoryStocks: string
  inventoryStocksTwo: string
  inventoryVariations: boolean
  selfShipping: boolean
  instaShopShipping: boolean
}

const schema = z.object({
  productTitle: z.string().min(1, "Product title is required"),
  productDescription: z.string().min(1, "Product description is required"),
  price: z.string().min(1, "Price is required"),
  oldPrice: z.string().min(1, "Price is required"),
  productCollection: z.string().min(1, "Product collection is required"),
  inventoryStocks: z.string().min(1, "Inventory stocks is required"),
  inventoryStocksTwo: z.string().min(1, "Inventory stocks is required"),
  inventoryVariations: z
    .boolean()
    .refine(val => val === true, "You must select inventory variations"),
  selfShipping: z.boolean(),
  instaShopShipping: z.boolean(),
})

const ProductDetails = () => {
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [selectedFileNames, setSelectedFileNames] = useState<
    {
      fileName: string
      imageFile: string
    }[]
  >([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]

    if (!files || files.length === 0) {
      toast.error("File error, kindly check file.", {
        position: "top-center",
      })
      return
    }

    const validFiles = Array.from(files).filter(file => {
      if (file.size > maxSize) {
        toast.error(`File "${file.name}" is larger than 5MB`, {
          position: "top-center",
        })
        return false
      }

      if (!allowedTypes.includes(file.type)) {
        toast.error(`File "${file.name}" is not a valid type`, {
          position: "top-center",
        })
        return false
      }

      return true
    })

    const fileData = validFiles.map(file => {
      const imageUrl = URL.createObjectURL(file)
      return {
        fileName: file.name,
        imageFile: imageUrl,
      }
    })

    if (fileData.length === 0) {
      toast.error("No valid files selected. Please try again.", {
        position: "top-center",
      })
      return
    }

    setSelectedFileNames(fileData)
  }

  const onSubmit = (data: FormData) => {
    if (selectedFileNames.length === 0) {
      toast.error("Please upload a store logo", {
        position: "top-center",
      })
      return
    }
    console.log(data)
  }
  return (
    <Onboarding
      rewindNumber={3}
      verticalDot={true}
      title={"Create a product"}
      submitButton={
        <div className="w-full flex gap-3 items-center justify-between">
          <button className="bg-[#fffff] text-[#8a226f] w-full border border-solid border-[#8A226F] py-3 rounded-full">
            Cancel
          </button>
          <button
            type="submit"
            form="create-store-form"
            className="bg-[#8a226f] text-white w-full py-3 rounded-full"
            style={{boxShadow: "4px 8px 24px 0px rgba(254, 44, 85, 0.2)"}}
          >
            Continue
          </button>
        </div>
      }
    >
      <form
        className="min-h-[200px] max-h-[82vh] overflow-y-auto scrollbar-hide"
        id="create-store-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="cursor-pointer">
            <IconDraft />
          </div>
          <span className="font-[500] text-[12px] text-[#8a226f]">
            Preview product
          </span>
        </div>
        <Accordion
          title="Basic details"
          recalculate={Object.values(errors).length > 0}
        >
          <div className="space-y-2">
            <div className="relative">
              <input
                id="productTitle"
                type="text"
                placeholder=" "
                className={`peer w-full border border-gray-300 rounded-[12px] h-[52px] px-3 pt-5 pb-2 placeholder-transparent text-sm focus:outline-none ${
                  errors.productTitle ? "border-red-600" : "border-gray-300"
                }`}
                {...register("productTitle")}
              />
              <label
                htmlFor="productTitle"
                className={`absolute left-3 top-1 text-gray-500 text-[12px] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#8A226F]`}
              >
                Product Title
              </label>
              {errors.productTitle && (
                <p className="text-red-500 text-sm">
                  {errors.productTitle.message}
                </p>
              )}
            </div>
            <div className="relative">
              <textarea
                id="productDescription"
                placeholder=" "
                className={`peer w-full border border-gray-300 rounded-[12px] h-[68px] px-3 pt-5 pb-2 placeholder-transparent text-sm focus:outline-none  ${
                  errors.productDescription
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                {...register("productDescription")}
              />
              <label
                htmlFor="productDescription"
                className={`absolute left-3 top-1 text-gray-500 text-[12px] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#8A226F]`}
              >
                Product Description
              </label>
              {errors.productDescription && (
                <p className="text-red-500 text-sm">
                  {errors.productDescription.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="relative">
                <input
                  id="price"
                  type="number"
                  placeholder=" "
                  className={`peer w-full border border-gray-300 rounded-[12px] h-[52px] px-3 pt-5 pb-2 placeholder-transparent text-sm focus:outline-none  ${
                    errors.price ? "border-red-600" : "border-gray-300"
                  }`}
                  {...register("price")}
                />
                <label
                  htmlFor="price"
                  className={`absolute left-3 top-1 text-gray-500 text-[12px] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#8A226F]`}
                >
                  Price
                </label>
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              <div className="relative">
                <input
                  id="oldPrice"
                  type="number"
                  placeholder=" "
                  className={`peer w-full border border-gray-300 rounded-[12px] h-[52px] px-3 pt-5 pb-2 placeholder-transparent text-sm focus:outline-none  ${
                    errors.oldPrice ? "border-red-600" : "border-gray-300"
                  }`}
                  {...register("oldPrice")}
                />
                <label
                  htmlFor="oldPrice"
                  className={`absolute left-3 top-1 text-gray-500 text-[12px] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#8A226F]`}
                >
                  Old Price
                </label>
                {errors.oldPrice && (
                  <p className="text-red-500 text-sm">
                    {errors.oldPrice.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="relative">
                <textarea
                  id="productCollection"
                  placeholder=" "
                  className={`peer w-full border border-gray-300 rounded-[12px] h-[68px] px-3 pt-5 pb-2 placeholder-transparent text-sm focus:outline-none  ${
                    errors.productCollection
                      ? "border-red-600"
                      : "border-gray-300"
                  }`}
                  {...register("productCollection")}
                />
                <label
                  htmlFor="productCollection"
                  className={`absolute left-3 top-1 text-gray-500 text-[12px] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#8A226F]`}
                >
                  Product Collection
                </label>
                {errors.productCollection && (
                  <p className="text-red-500 text-sm">
                    {errors.productCollection.message}
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                id="inventoryStocks"
                type="text"
                placeholder=" "
                className={`peer w-full border border-gray-300 rounded-[12px] h-[52px] px-3 pt-5 pb-2 placeholder-transparent text-sm focus:outline-none  ${
                  errors.inventoryStocks ? "border-red-600" : "border-gray-300"
                }`}
                {...register("inventoryStocks")}
              />
              <label
                htmlFor="inventoryStocks"
                className={`absolute left-3 top-1 text-gray-500 text-[12px] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#8A226F]`}
              >
                Inventory Stocks
              </label>
              {errors.inventoryStocks && (
                <p className="text-red-500 text-sm">
                  {errors.inventoryStocks.message}
                </p>
              )}
            </div>
          </div>
        </Accordion>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <Accordion
          title="Product images"
          recalculate={(selectedFileNames?.length > 0) as boolean}
        >
          <div className="space-y-3 mb-4">
            {selectedFileNames?.map((value, index) => {
              return (
                <div className="flex items-center justify-between" key={index}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={value?.imageFile}
                      height={60}
                      width={60}
                      alt=""
                    />
                    <p className="text-[14px] font-[400]">{value?.fileName}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="bg-[#f7f7f7] h-[40px] flex items-center justify-center w-full p-[10px] rounded-[90px] cursor-pointer relative">
            <div className="flex items-center justify-center gap-2">
              <p className="font-medium text-sm text-[#8A226F]">Add image</p>
              <IconUpload />
            </div>
            <input
              style={{
                height: 40,
                width: 40,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
              }}
              type="file"
              accept=".jpeg,.jpg,.png"
              name="file"
              multiple={true}
              onChange={e => {
                handleFileChange(e)
              }}
            />
          </div>
        </Accordion>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <div>
          <p className="w-full text-left py-3 font-medium cursor-pointer">
            Inventory variations
          </p>
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              style={{
                width: "25px",
                height: "25px",
                accentColor: "#8A226F",
              }}
            />
            <p className="font-[400] text-sm text-[#666666]">
              This product is variable; has different colors, sizes, weight,
              materials, etc.
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-3"></div>
        <Accordion
          title="Shipping"
          recalculate={Object.values(errors).length > 0}
        >
          <div className="space-y-7">
            <div className="flex gap-3 justify-between items-center">
              <p className="font-[400] text-[12px] text-[rgba(0, 0, 0, 0.9)]">
                Self shipping
              </p>
              <input
                type="checkbox"
                style={{
                  width: "20px",
                  height: "20px",
                  accentColor: "#8A226F",
                }}
              />
            </div>
            <div className="flex gap-3 justify-between items-center">
              <p className="font-[400] text-[12px] text-[rgba(0, 0, 0, 0.9)]">
                InstaShop shipping
              </p>
              <input
                type="checkbox"
                {...register("instaShopShipping")}
                style={{
                  width: "20px",
                  height: "20px",
                  accentColor: "#8A226F",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <input
                id="inventoryStocksTwo"
                type="text"
                placeholder=" "
                className={`peer w-full border border-gray-300 rounded-[12px] h-[52px] px-3 pt-5 pb-2 placeholder-transparent text-sm focus:outline-none  ${
                  errors.inventoryStocksTwo
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                {...register("inventoryStocksTwo")}
              />
              <label
                htmlFor="inventoryStocks"
                className={`absolute left-3 top-1 text-gray-500 text-[12px] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#8A226F]`}
              >
                Inventory Stocks
              </label>
              {errors.inventoryStocksTwo && (
                <p className="text-red-500 text-sm">
                  {errors.inventoryStocksTwo.message}
                </p>
              )}
            </div>
          </div>
        </Accordion>
      </form>
    </Onboarding>
  )
}

export default ProductDetails
