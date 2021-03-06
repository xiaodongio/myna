import mongoose from "mongoose";
import bcrypt from "bcryptjs";


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
  loginName: { type: String, unique: true },
  password: {
    type: String,
    set: (value: string) => {
      return bcrypt.hashSync(value);
    }
  },
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