import mongoose from "mongoose";


export interface UserDocument extends mongoose.Document {
  loginName: string;
  password: string;
  profile: {
    name: string,
    gender: string,
    location: string,
    website: string,
    picture: string,
  };
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  tokens: Array,
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });


export const User = mongoose.model<UserDocument>("user", userSchema);