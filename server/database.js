import mongoose from "mongoose";
import "dotenv/config";
export const connectDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to mongoose");
  } catch (error) {
    console.log(error);
  }
};
