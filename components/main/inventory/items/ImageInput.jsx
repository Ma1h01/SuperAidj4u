import React from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

const ImageInput = ({
  label,
  imageUrl = "",
  setImageUrl,
  uploadEnpoint = "imageUploader",
  className = "col-span-full",
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="image image"
          width={1000}
          height={667}
          className="w-full h-64 object-cover"
        />
      ) : (
        <UploadDropzone
          endpoint={uploadEnpoint}
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
            // Do something with the response
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
};

export default ImageInput;
