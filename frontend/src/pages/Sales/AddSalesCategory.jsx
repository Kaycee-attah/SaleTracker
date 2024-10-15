import React, { useEffect, useState } from 'react';
import {
  fetchSalesCategories,
  addSalesCategory,
  updateSalesCategory,
  deleteSalesCategory,
} from '../../Controllers/salesCategoryController'; // Import the fetch functions

const AddSalesCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [editingCategory, setEditingCategory] = useState(null); // For tracking which category is being edited

  // Function to fetch existing categories
  const fetchCategories = async () => {
    try {
      const fetchedCategories = await fetchSalesCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      setMessage('Failed to load categories');
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle adding or updating a category
  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      setMessage('Please enter a category name');
      return;
    }

    try {
      if (editingCategory) {
        // Update existing category
        
        const updatedCategory = await updateSalesCategory({
          id: editingCategory._id,
          name: categoryName,
        });
        setCategories(categories.map((cat) =>
          cat._id === editingCategory._id ? updatedCategory : cat
        ));
        console.log(categories);
        
        setEditingCategory(null); // Reset editing state
        setMessage('Category updated successfully!');
      } else {
        // Add new category
        const newCategory = await addSalesCategory({ name: categoryName });
        setCategories([...categories, newCategory]); // Update the categories list
        setMessage('Category added successfully!');
      }
      setCategoryName(''); // Clear the input field
    } catch (error) {
      setMessage('Failed to save category');
    }
  };

  // Handle editing a category
  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setEditingCategory(category);
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteSalesCategory(categoryId);
      setCategories(categories.filter((cat) => cat._id !== categoryId)); // Remove deleted category from state
      setMessage('Category deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete category');
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        {editingCategory ? 'Edit Sales Category' : 'Add Sales Category'}
      </h2>
      <form onSubmit={handleAddOrUpdateCategory} className="mb-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          {editingCategory ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      {/* Display existing categories */}
      <h3 className="mb-2 text-lg font-semibold">Existing Categories</h3>
      <ul className="pl-5 list-disc">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id} className="flex items-center justify-between mb-1 text-gray-700">
              <span>{category.name}</span>
              <div>
                <button
                  onClick={() => handleEditCategory(category)}
                  className="px-2 py-1 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="px-2 py-1 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No categories found.</li>
        )}
      </ul>

      {/* Message Display */}
      {message && <div className="mt-4 text-red-500">{message}</div>}
    </div>
  );
};

export default AddSalesCategory;
