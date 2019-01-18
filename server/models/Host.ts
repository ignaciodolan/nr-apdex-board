import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const HostSchema = new Schema({
  url: {
    type: String,
    required: 'Enter url'
  },
  applications : [
    {
      type: Schema.Types.ObjectId, ref: 'Application'
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});