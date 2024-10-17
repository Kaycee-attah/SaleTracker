// models/imageModel.js
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Image = mongoose.model('Images', imageSchema);

export default Image;
