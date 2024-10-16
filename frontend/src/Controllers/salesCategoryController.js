const BASE_URL = 'https://saletracker-backend.onrender.com/api';

// Fetch existing sales categories
export const fetchSalesCategories = async () => {
    const res = await fetch(`${BASE_URL}/sales/categories`);
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.error);
    }
    return data;
  };

export const addSalesCategory = async (categoryData) => {
    const res = await fetch(`${BASE_URL}/sales/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
  
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.error);
    }
    return data;
  };

// Function to update a sales category
export const updateSalesCategory = async ({ id, name }) => {
    const response = await fetch(`${BASE_URL}/sales/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update category');
    }
  
    return await response.json();
  };
  
  // Function to delete a sales category
  export const deleteSalesCategory = async (id) => {
    const response = await fetch(`${BASE_URL}/sales/categories/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  
    return await response.json();
  };
  