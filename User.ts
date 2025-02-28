import { Model, Schema } from "mongoose";

const mongoose = require("mongoose");

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", UserSchema) as Model<IUser>;

export default UserModel;
