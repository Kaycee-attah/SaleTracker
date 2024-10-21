import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  sectionName: { type: String, required: true },
  fileName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const HeroImage = mongoose.model('HeroImage', imageSchema);
const Product1Image = mongoose.model('Product1Image', imageSchema);
const Product2Image = mongoose.model('Product2Image', imageSchema);
const CassavaFlourImage = mongoose.model('CassavaFlourImage', imageSchema);

export { HeroImage, Product1Image, Product2Image, CassavaFlourImage };
