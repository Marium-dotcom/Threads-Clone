"use client"
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function BottomBar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <section className=' bottombar  '>
      <div className='bottombar_container'>
      {sidebarLinks.map((link)=>{ 
        const isActive = (pathname.includes(link.route) && link.route.length > 1) ||pathname === link.route
        return (<div  key={link.route}>
        
      <Link className={ ` bottombar_link ${isActive && 'bg-primary-500'}`} href={link.route}>
        <Image width={24} height={24} alt='img' src={link.imgURL}></Image>
        <p className=' text-light-1 max-lg:hidden'>{link.label}</p>
        </Link>
      </div>)})}</div>
    </section>  
  )
}
