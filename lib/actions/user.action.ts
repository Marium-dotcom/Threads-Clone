"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
  }
  

export async function updateUser({
    userId,
    bio,
    name,
    path,
    username,
    image
}: Params): Promise<void> {
    connectToDB()

try {

    await User.findOneAndUpdate(
        {id: userId},
         {username: username.toLocaleLowerCase(),
         bio, name, path, image, onBoarding: true},
          {upsert: true})
   
   
    if (path === "/profile/edit") {
        revalidatePath(path);
      }
} catch (error: any) {
console.log(error);

}

}


export async function fetchUser(userId:string){
    try {
        connectToDB()

        return await User.findOne({id: userId})
        
    } catch (error) {
        console.log(error);
        
    }
}

