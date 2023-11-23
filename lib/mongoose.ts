import mongoose, { Mongoose } from 'mongoose';

let isConnected = false; // track the connection


export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  if(!process.env.MONGODB_URI){
    console.log("KEY NOT FOUND");
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)

    isConnected = true;
    console.log("MongoDB connected");


  } catch (error) {
    console.log(error);
  }
}