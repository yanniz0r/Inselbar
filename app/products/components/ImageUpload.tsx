import React, { FC, useEffect, useRef, useState } from "react"
import { FaFileImage } from "react-icons/fa"

interface ImageUploadProps {
  onChange(value: string): void
  value?: string
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [base64, setBase64] = useState<string | undefined>(value)

  useEffect(() => {
    if (base64) {
      onChange(base64)
    }
  }, [base64, onChange])

  return (
    <>
      <label className="block border-2 border-gray-100 rounded-lg bg-white overflow-hidden">
        {base64 ? (
          <div>
            <img src={base64} alt="Your upload" />
          </div>
        ) : (
          <div className="flex justify-center items-center text-gray-200 text-6xl py-24">
            <FaFileImage />
          </div>
        )}
        <div className="border-t-2 border-gray-100 p-3">
          <input
            type="file"
            ref={inputRef}
            onChange={(event) => {
              console.log(event.target.files)
              const fileReader = new FileReader()
              fileReader.onload = (onload) => {
                var srcData = onload?.target?.result
                console.log(srcData)
                setBase64(srcData as string)
              }
              fileReader.readAsDataURL(event.target.files?.item(0)!)
            }}
          />
        </div>
      </label>
    </>
  )
}

export default ImageUpload
