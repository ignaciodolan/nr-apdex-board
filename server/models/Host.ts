import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const hostSchema = new Schema({
  url: {
    type: String,
    required: 'Enter url'
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Application'
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
const Host = mongoose.model('Host', hostSchema);
export default Host;
