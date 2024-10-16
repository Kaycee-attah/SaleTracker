// controllers/categoryController.js

const BASE_URL = 'https://saletracker-backend.onrender.com/api';

// Function to fetch all categories
export const fetchCategories = async () => {
    const res = await fetch(`${BASE_URL}/categories`);
    const data = await res.json();
    
    
    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

// Function to add a new category
export const addCategory = async (name) => {
    const res = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

// Function to update an existing category
export const updateCategory = async (id, name) => {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

// Function to delete a category
export const deleteCategory = async (id) => {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};
