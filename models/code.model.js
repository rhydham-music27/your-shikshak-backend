import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true, // ensures DB-level uniqueness
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CodeModel = mongoose.model('Code', codeSchema);
export default CodeModel;
