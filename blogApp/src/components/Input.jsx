import React,{useId} from 'react'

const Input = React.forwardRef(({label, type='text', className='' , ...props}, ref) => {
    const id = useId();
  return (
    <div className='width-full'>
        {label && (
            <label htmlFor={id} className='block mb-2 font-medium text-gray-700'>
                {label}
            </label>
        )}
        <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 
                duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
        />
    </div>
  )
}
)
export default Input