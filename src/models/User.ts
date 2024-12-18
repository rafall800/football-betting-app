import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the User interface
export interface IUser extends Document {
  username: string;
  password: string;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
