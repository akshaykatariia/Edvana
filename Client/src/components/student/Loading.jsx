import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Loading = () => {
  const { path } = useParams()
  const navigate = useNavigate() 
  
  // stripe webhook take 2 3 second to complete the process so we wait for 5 second so stripe complete there there process and the backend is updated and after 5 second we rdirect to my-enrollment page 

  useEffect(() => {
    if (path) {
      const time = setTimeout(() => {
        navigate(`/${path}`)
      }, 5000);
      return () => clearTimeout(time)
    }
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin'></div>
    </div>
  )
}

export default Loading;
