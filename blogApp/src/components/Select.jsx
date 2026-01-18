import { useId } from "react"
import React from 'react'

const Select = ({
    label,
    className='',
    options,
    ...props
},ref) => {
    const id = useId();
  return (
    <div className="w-full">
        {<label htmlFor={id} className="block mb-2 font-medium text-gray-700">
            {label}
        </label>}
        <select
            id={id}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50  
                duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
        >
            {options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)