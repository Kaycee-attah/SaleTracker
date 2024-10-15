import SalesCategory from '../../models/SalesCategory.js';

// Function to add a new sales category
export const addSalesCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new SalesCategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to fetch all sales categories (optional)
export const getSalesCategories = async (req, res) => {
  try {
    const categories = await SalesCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Update a sales category
export const updateSalesCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the URL
  const { name } = req.body; // Get the new name from the request body

  try {
    const updatedCategory = await SalesCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

// Delete a sales category
export const deleteSalesCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the URL

  try {
    const deletedCategory = await SalesCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
