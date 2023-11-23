import ThreadCard from '@/components/cards/ThreadCard'
import CommentForm from '@/components/forms/CommentForm';
import { fetchThreadById } from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

export default async function Page({params}: {params: {id: string}}) {

  const user = await currentUser();
  if (!user) return null;

  const thread = await fetchThreadById(params.id);
  const userInfo = await fetchUser(user.id);


  return (
<>
<div>
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />

<div className='mt-7'>
        <CommentForm
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      </div>
</>  )
}
