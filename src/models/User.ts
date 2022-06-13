import { Document, Schema, Model, model, Error } from "mongoose";

export interface IUserM extends Document {
  contact: {
    firstName?: string;
    lastName?: string;
    email: string;
  }
  username: string;
  profilePictureUrl?: string;
  isActive: boolean;
  fullName(): string;
  comparePassword(candidatePassword: any): boolean;
}

export const userSchema: Schema = new Schema({
  contact: {
    firstName: { type: String, default: null },
    lastLame: { type: String, default: null },
    email: {
      type: String,
      lowercase: true,
      required: true,
      validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
      index: { unique: true },
    },
  },
  username: { type: String, required: true, index: { unique: true } },
  profilePictureUrl: { type: String, default: null },
  deletedAt: {type: String, default: null },
}, { timestamps: true });

userSchema.methods.fullName = function(): string {
  return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserM> = model<IUserM>("User", userSchema);