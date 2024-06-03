import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface ImageUploadProps {
  onChange: (base64: string) => void
  label: string
  value?: string
  disabled?: boolean
}

export const ImageUpload: React.FC<ImageUploadProps> = (
  props: ImageUploadProps,
) => {
  const { onChange, label, value, disabled } = props

  const [base64, setBase64] = useState(value)

  const handleDrop = (files: File[]) => {
    const file = files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const value = event.target?.result as string
      setBase64(value)
      onChange(value)
    }

    reader.readAsDataURL(file)
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-white text-center border-2 border-dotted rounded-md',
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className='flex items-center justify-center'>
          <Image src={base64} height={100} width={100} alt='Upload Image' />
        </div>
      ) : (
        <p>{label}</p>
      )}
    </div>
  )
}
