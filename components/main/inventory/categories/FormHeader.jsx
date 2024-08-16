import React from 'react'
import Link from 'next/link'
import {X} from 'lucide-react'
const FormHeader = ({title, href}) => {
  return (
    <div className="flex items-center justify-between bg-white py-3 px-5">
    <h2 className="text-xl font-semibold">{title}</h2>
    <a href={href}>
      <X/>
    </a>
    </div>
  )
}

export default FormHeader