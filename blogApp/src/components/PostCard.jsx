import React from 'react'
import appWriteService from '../appwrite/configDatabase'
import { Link  } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className='border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg
            duration-200 px-4 flex flex-col h-full'>
                <div className='h-48 w-full mb-4 overflow-hidden'>
                    <img 
                        src={appWriteService.getFilePreviewURL(featuredImage)} 
                        alt={title} 
                        className='w-full h-full object-cover hover:scale-105 duration-200'
                    />
                </div>
                <div className='mb-4 flex-1'>
                    <h2 className='text-lg font-semibold text-gray-800'>
                        {title}
                    </h2>
                    
                </div>
            </div>
    </Link>
  )
}

export default PostCard