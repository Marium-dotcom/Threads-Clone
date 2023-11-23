import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { UserButton, currentUser } from "@clerk/nextjs";
 
export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const result = await fetchPosts(1,20) 
  if( !result) return null

  console.log(result.posts[0].text);
  


  return (
    <div>
      {/* <UserButton afterSignOutUrl="/"/> */}
      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  )
}