import mongoose from 'mongoose';

const SalesCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure category names are unique
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const SalesCategory = mongoose.model('SalesCategory', SalesCategorySchema);

export default SalesCategory;
