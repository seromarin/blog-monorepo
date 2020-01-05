import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  register_date: String,
})