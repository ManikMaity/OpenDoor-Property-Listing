import React from 'react'
import useUserStore from '../store/userStore'

function Home() {

  const {user} = useUserStore();

  console.log(user);

  return (
    <div className='min-h-screen w-full bg-gray-100 dark:bg-gray-900'>
      
    </div>
  )
}

export default Home
