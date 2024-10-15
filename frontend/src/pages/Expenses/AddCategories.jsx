import React, { useEffect, useState } from 'react';
import { fetchCategories, addCategory, deleteCategory, updateCategory } from '../../Controllers/categoryController'; // Import controller functions

const AddCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Track index for editing
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch existing categories on component mount
    const getCategories = async () => {
      try {
        const existingCategories = await fetchCategories();
        setCategories(existingCategories);
      } catch (error) {
        setMessage('Failed to fetch categories.');
        console.error(error); // Log error for debugging
      }
    };

    getCategories();
  }, []); // Empty dependency array ensures it runs once on mount

  // Handle input change
  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory.trim() === '') {
      setMessage('Category name cannot be empty.');
      return;
    }
    if (categories.includes(newCategory.trim())) {
      setMessage('Category already exists.');
      return;
    }

    const added = await addCategory(newCategory.trim());
    if (added) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
      setMessage('Category added successfully!');
    } else {
      setMessage('Failed to add category.');
    }
  };

  // Handle editing a category
  const handleEditCategory = async (index) => {
    if (newCategory.trim() === '') {
      setMessage('Category name cannot be empty.');
      return;
    }

    const updated = await updateCategory(categories[index], newCategory.trim());
    if (updated) {
      const updatedCategories = [...categories];
      updatedCategories[index] = newCategory.trim();
      setCategories(updatedCategories);
      setNewCategory('');
      setEditIndex(null);
      setMessage('Category updated successfully!');
    } else {
      setMessage('Failed to update category.');
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (category) => {
    const deleted = await deleteCategory(category);
    if (deleted) {
      setCategories(categories.filter((cat) => cat !== category));
      setMessage('Category deleted successfully!');
    } else {
      setMessage('Failed to delete category.');
    }
  };

  // Handle going back (you could use routing here)
  const handleBack = () => {
    console.log('Back to previous page');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Manage Categories</h2>
        {message && <div className="mb-4 text-center text-green-500">{message}</div>}

        {/* Input for new category */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold" htmlFor="newCategory">
            New Category
          </label>
          <input
            type="text"
            id="newCategory"
            value={newCategory}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter category name"
          />
        </div>

        <button
          onClick={handleAddCategory}
          className="w-full py-2 mb-4 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Add Category
        </button>

        {/* Existing categories list */}
        <h3 className="mb-2 text-lg font-semibold">Existing Categories:</h3>
        <ul className="pl-5 mb-4 list-disc">
          {categories.map((category, index) => (
            
            <li key={index} className="flex items-center justify-between mb-2 text-gray-700">
              <span>{category.name}</span>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setNewCategory(category.name);
                    setEditIndex(index);
                  }}
                  className="mr-2 text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Back button */}
        <button
          onClick={handleBack}
          className="px-4 py-2 font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddCategories;
