// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  // Ensure category names are unique
    },
}, { timestamps: true });

const Category = mongoose.model('Expenses_Category', categorySchema);

export default Category;
