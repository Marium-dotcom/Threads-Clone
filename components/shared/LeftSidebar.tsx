"use client"
import React from 'react'
import {sidebarLinks} from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname, useRouter} from 'next/navigation'

export default function LeftSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <section className=' custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
      {sidebarLinks.map((link)=>{ 
        const isActive = (pathname.includes(link.route) && link.route.length > 1) ||pathname === link.route
        return (<div  key={link.route}>
        
      <Link className={ `leftsidebar_link ${isActive && 'bg-primary-500'}`} href={link.route}>
        <Image width={24} height={24} alt='img' src={link.imgURL}></Image>
        <p className=' text-light-1 max-lg:hidden'>{link.label}</p>
        </Link>
      </div>)})}</div>
    </section>  
  )
}
