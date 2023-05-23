// import mongoose from "mongoose"
// export const UserSchema= new mongoose.Schema({
//     mobile:{
//         type: String,
//         required:[true, "please provide unique number"],
//         unique : [true,"phone number exist"]
//     },
//     password:{
//         type: String,
//         required:[true, "please provide a password"],
//         unique: false,
//     },
//     email:{
//         type:String,
//         required:[true, "please provide  a unique email"],
//         unique:true,
//     },
//     firstName:{type: String},
//     lastName:{type: String},
    
//     profile:{type: String},
// })

// export default mongoose.model.Users || mongoose.model("User",UserSchema )

import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, "Please provide a unique number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  profile: { type: String },
  role: { 
    type: String,
    default: "user"
},
});

export default mongoose.model("User", UserSchema);
