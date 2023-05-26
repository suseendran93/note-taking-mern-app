import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const uri =
      "mongodb+srv://suzeendran:susee1234@notes-cluster.u2yrny7.mongodb.net/notes?retryWrites=true&w=majority";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to mongoose");
  } catch (error) {
    console.log(error);
  }
};
