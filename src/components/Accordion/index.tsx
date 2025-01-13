// components/Accordion.tsx
import {useState, useRef, useEffect} from "react"
import IconArrrowDown from "../IconComponents/IconArrrowDown"

interface AccordionProps {
  title: string
  children: React.ReactNode
  recalculate?: boolean
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  recalculate,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ((isOpen && contentRef.current) || recalculate) {
      const rect = contentRef?.current?.getBoundingClientRect()
      setHeight(rect?.height as number)
    } else {
      setHeight(0)
    }
  }, [isOpen, recalculate])

  return (
    <div className="my-2">
      <div
        className="flex items-center justify-between"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <p className="w-full text-left py-3 font-medium cursor-pointer">
          {title}
        </p>
        <div className="cursor-pointer">
          <IconArrrowDown />
        </div>
      </div>
      <div
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{height: isOpen ? `${height}px` : "0px"}}
      >
        <div ref={contentRef} className="py-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Accordion
