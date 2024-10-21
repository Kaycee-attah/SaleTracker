import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LandingPageImage = mongoose.model('LandingPageImages', ImageSchema);

export default LandingPageImage;

