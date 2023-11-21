
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://bett:19990303je@cluster0.okpp7ux.mongodb.net/ehr?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
};

export default connectDatabase;
