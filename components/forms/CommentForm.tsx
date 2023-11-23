"use client"
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from "zod"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { Textarea } from '@/components/ui/textarea';
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from '@/lib/validations/comment';

interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string,
  }

  
export default function CommentForm({threadId,currentUserImg,currentUserId}:Props) 

{
  const router = useRouter();
  const pathname = usePathname();


const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: ""    },
  });



 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
//    await updateThread()  


router.push('/')


  }



  return (
<>


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
