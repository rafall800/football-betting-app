import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the User interface
export interface IUser extends Document {
  username: string;
  password: string;
  points: number;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
