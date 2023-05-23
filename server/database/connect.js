// import mongoose from "mongoose";

// mongoose.set("strictQuery", true);

// const connectDatabase = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://bett:19990303je@cluster0.okpp7ux.mongodb.net/?retryWrites=true&w=majority', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("MongoDB connected successfully!");
//   } catch (err) {
//     console.log(`MongoDB connection error: ${err}`);
//   }
// };

// export default connectDatabase;

import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://bett:19990303je@cluster0.okpp7ux.mongodb.net/reservation?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
};

export default connectDatabase;
