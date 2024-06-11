
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDatabase = async () => {
  try {
    await mongoose.connect(mongodb+srv://jessebett:19990303je@cluster0.rmterut.mongodb.net/table-mate {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log(`Mongo connection error: ${err}`);
  }
};

export default connectDatabase;
