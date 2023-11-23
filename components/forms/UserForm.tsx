"use client"
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user';
import * as z from "zod"
import { Button } from "@/components/ui/button";
import {useUploadThing} from "@/lib/uploadthing"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { updateUser } from '@/lib/actions/user.action';
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user:{
    id: string,
    objectId: string,
    username: string,
    name: string,
    bio: string,
    image: string
  };
  btn:string
}

export default function FormUser({user, btn}:Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [file, setFile] = useState<File[]>([])
  const {startUpload} = useUploadThing("media")
  
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues:{
      profile_photo: user.image || "",
      name: user.name || "",
      username: user.username ||'',
      bio: user.bio || '',
    }
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();
    const fileReader = new FileReader()

    if(e.target.files && e.target.files.length > 0){

    const file = e.target.files[0]
    setFile(Array.from(e.target.files))
    if (!file.type.includes("image")) return

    fileReader.onload = async (e) => {
      const imgURL = e.target?.result?.toString()||""
      fieldChange(imgURL)

    }

    fileReader.readAsDataURL(file)
    }
  }

 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const blob = values.profile_photo
    const hasImageChanged = isBase64Image(blob)
    if (hasImageChanged) {

      const imgRES = await startUpload(file)

      if(imgRES && imgRES[0].fileUrl)
      {
        values.profile_photo = imgRES[0].fileUrl;
      }
    }
   await updateUser(
    {name:values.name,
    path:pathname,
    userId:user.id,
    username: values.username,
     bio: values.bio,
    image: values.profile_photo})

    console.log(values)
  }


  return (
<>

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 m-auto w-3/5 ">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>{field.value? <Image src={field.value} alt='profile photo' width={96} height={96} priority className='rounded-full object-contain'></Image> : <Image src='/assets/profile.svg' alt='profile photo' width={24} height={24} priority className='rounded-full object-contain'></Image>}</FormLabel>
              <FormControl> 
                <Input placeholder="upload a photo" type='file' accept='image/**' onChange={(e)=> handleImage(e, field.onChange)} />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Name</FormLabel>
              <FormControl> 
                <Input placeholder="name" type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Username</FormLabel>
              <FormControl> 
                <Input placeholder="username" type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' text-white'>Bio</FormLabel>
              <FormControl> 
                <Textarea placeholder="bio"  {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>

</>  )
}
