import mongoose from "mongoose";

dotenv.config();


export const connectMongo = async(connectionURL)=>{
    const connection = await mongoose.connect(connectionURL)
    return connection
}