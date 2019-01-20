import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  name: {
    type: String,
    required: 'Enter name'
  },
  contributors: [String],
  version: {
    type: Number
  },
  apdex: {
    type: Number,
    required: 'Enter Apdex'
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
const Application = mongoose.model('Application', applicationSchema);
export default Application;