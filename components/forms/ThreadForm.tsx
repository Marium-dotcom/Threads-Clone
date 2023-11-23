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

import { Textarea } from '@/components/ui/textarea';
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.action';

interface Props {
    userId: string;
  }

  
export default function ThreadForm({userId}:Props) 
{
  const router = useRouter();
  const pathname = usePathname();


const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });



 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ThreadValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
//    await updateThread()  

await createThread({text: values.thread,
author: userId,
communityId:null,
path: pathname,
})


router.push('/')


  }



  return (
<>

<h1>Create Thread</h1>

<Form {...form}>
  
      <form  className="flex flex-col gap-10 m-auto w-3/5 "         onSubmit={form.handleSubmit(onSubmit)}
>
  




<FormField

          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' text-white'>Content</FormLabel>
              <FormControl> 
                <Textarea placeholder="Write your thoughts!"  {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Post</Button>
      </form>
    </Form>

</>  )
}
