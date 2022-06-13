import { Document, Schema, Model, model, Schema as MongooseSchema, } from "mongoose";

export interface IComment extends Document {
  text: string;
  mentions?: string[];
  hashtags?: string[];
  user: string;
}

export const commentSchema: Schema = new Schema({
  text: { type: String, default: null },
  mentions: { type: [String], default: [] },
  hashtags: { type: [String], default: [] },
  deleted_at: {type: String, default: null },
  user: { type: MongooseSchema.Types.ObjectId, ref:  'User'}
}, { timestamps: true });

export const Comment: Model<IComment> = model<IComment>("Comment", commentSchema);