import { Document } from 'mongoose';

export interface NewUser extends Document {
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly register_date: string
}