import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ApplicationSchema = new Schema({
  name: {
    type: String,
    required: 'Enter name'
  },
  contributors: [String],
  version: {
    type: String
  },
  hosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Host'
    }
  ],
  apdex: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});