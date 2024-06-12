
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://sammwangi268:<H9KfRTEUGlmvnfEO>@sammwangi.mim4quv.mongodb.net/?retryWrites=true&w=majority&appName=sammwangi" {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log(`Mongo connection error: ${err}`);
  }
};

export default connectDatabase;
