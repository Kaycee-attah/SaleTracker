import Category from "../../models/Category.js";



// Function to add a new category
export const addCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Category name is required.' });
    }

    try {
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: 'Category added successfully!', category });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Category already exists.' });
        }
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
};

// Function to get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
};


// Function to update categories
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) return res.status(404).json({ error: 'Category not found.' });
        res.status(200).json({ message: 'Category updated successfully!', category });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
}

// Funtion to delete a category
export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json({ error: 'Category not found.' });
        res.status(200).json({ message: 'Category deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
}
