import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'batches', // Reference to the Batch model
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
}, {
    timestamps: true,
  });

const Sale = mongoose.model('Sales', SaleSchema);

export default Sale;
