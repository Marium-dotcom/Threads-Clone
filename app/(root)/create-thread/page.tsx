import ThreadForm from '@/components/forms/ThreadForm'
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

 async function CreateThread() {
  const user = await currentUser();
   
console.log(user);

  if (!user) return null;
  

  const userInfo = await fetchUser(user.id);
console.log(userInfo);

  
  return (
<>
<h1 className='head-text'>Create Thread</h1>

      <ThreadForm userId={userInfo._id}/>
      </>
  )



}
  export default CreateThread;
