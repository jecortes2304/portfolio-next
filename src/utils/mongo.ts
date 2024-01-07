import mongoose from "mongoose"
import { getEnvsMongo } from '@/config/settings'

const {mongodbUri} = getEnvsMongo();

if (!mongodbUri) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}
export default async function connectDB() {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false
    };

    mongoose.set("strictQuery", true)
    await mongoose.connect(mongodbUri!, options)

    mongoose.connection
        .once("open", () => {
            console.log("✅ New connection established");
        })
        .on("error", error => {
            console.error("❌ Connection to database failed");
            throw error;
        });
}