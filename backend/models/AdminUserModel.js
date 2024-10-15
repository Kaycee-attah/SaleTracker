import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User collection
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // This will hold the Firebase image URL
    required: true,
  },
}, { timestamps: true });

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

export default AdminUser;
