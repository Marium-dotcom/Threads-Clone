import { OrganizationSwitcher, SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function TopBar() {
  return (
    <nav className='topbar text-white'>
        <Link href={`/`} className='flex items-center gap-4'><p className=' text-heading3-bold text-light-1 max-xs:hidden'>Threads</p></Link>
    <div className=' flex'>
    {/* <OrganizationSwitcher appearance={{elements:{
        organizationSwitcherTrigger: "py-4 px-4 "
      }}}/> */}
      <SignedIn>
        <SignOutButton/>
      </SignedIn>

      <SignedOut>
        <SignInButton/>
      </SignedOut>

  
    </div>
    </nav>
  )
}
