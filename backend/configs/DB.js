import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.DB_URL)
        console.log(`Database Connected... ${response.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}