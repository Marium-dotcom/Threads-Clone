import FormUser from '@/components/forms/UserForm';
import { currentUser } from '@clerk/nextjs';
import React from 'react'




async function OnBoarding(){
  

  const user = await currentUser()
const userInfo = {}

  const userData = {
    id: user?.id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl, 


}
    return (
  
  <>
    <h1 className='head-text'>OnBoarding</h1>
    
    <div>
      <p className=' text-white'>complete your profile to use threads</p>
      <FormUser user={userData} btn={"continue"}/>
    </div>
    </>
  )
  
}


export default OnBoarding;