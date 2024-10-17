// models/imageModel.js
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const LandingPageImage = mongoose.model('LandingPageImages', imageSchema);

export default LandingPageImage;
