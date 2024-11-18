'use client'
import React from 'react'
import { UploadDropzone, UploadButton} from "@/lib/uploadthing";
// import { UploadButton } from "@uploadthing/react";
import { Pencil, UploadCloud, XCircle } from "lucide-react";
import Image from "next/image";


import { ImageInput } from '@/lib/types';
import { useToast } from '../ui/use-toast';

export default function ImageUploader({
    label,
  imageUrl ,
  setImageUrl,
  className = "col-span-full",
 
}:ImageInput) {


   const {toast}=useToast()
    const imageRemover=()=>{
        setImageUrl("");
        toast({
            title: `Ooops!`,
            description: `Image removed`,
            })
          }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="category-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={imageRemover}
            type="button"
            className="flex space-x-2  bg-violet-400 rounded-md shadow text-slate-50  py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-cover"
        />
      ) : (
        <UploadButton 
          endpoint="doctorImageUploader"
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
            // Do something with the response
            toast({
                title: `Success`,
                description: `Image uploaded successfully`,
                })
           
            // console.log("Files: ", res);
            // console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast({
                title: `Error`,
                description: `Image upload failed`,
                })
            console.log(error);
          }}
        />
      )}
    </div>
  )
}
