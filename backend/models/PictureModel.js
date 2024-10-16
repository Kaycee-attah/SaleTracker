import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  folder: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Picture = mongoose.model('Pictures', imageSchema);

export default Picture