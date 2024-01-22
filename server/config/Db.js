import mongoose from "mongoose";

const connectDB  = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        if(conn){
            console.log(`Database connect successfully ${conn.connection.host}`.bgMagenta)
        }

    } catch (error) {
        console.log(`Something went wrong in Database connection ${error}`.bgRed)
    }
};

export default  connectDB