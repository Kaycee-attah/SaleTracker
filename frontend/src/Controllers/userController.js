const BASE_URL = 'https://saletracker-backend.onrender.com'; // Base URL for your API
const API_URL = 'https://saletracker-backend.onrender.com/auth/users'; // Change this to match your backend route

// Register user function
export const registerUser = async (userData) => {
    if (!userData.email || !userData.password || !userData.name) {
        throw Error('All fields are required')
    }

    if ( userData.password !== userData.confirmPassword) {
        throw Error('Passwords do not match')
    }

    
    
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send user data as JSON
    });
    console.log(userData);
    

    const data = await res.json(); // Parse the response

    if (!res.ok) {
        throw Error(data.error); // Throw an error if the response is not OK
    }
    
    localStorage.setItem("token", data.token)
    localStorage.setItem("email", userData.email)

    return data; // Return the response data
};

// Example function to assign roles to users
export const assignUserRole = async (userId, role) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }), // Send the role as JSON
    });

    const data = await res.json(); // Parse the response

    if (!res.ok) {
        throw Error(data.error); // Throw an error if the response is not OK
    }

    return data; // Return the updated user data
};

// Example function to remove a role from a user
export const removeUserRole = async (userId, role) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/remove-role`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }), // Send the role as JSON
    });

    const data = await res.json(); // Parse the response

    if (!res.ok) {
        throw Error(data.error); // Throw an error if the response is not OK
    }

    return data; // Return the updated user data
};

// controllers/authController.js

export const loginUser = async (userData) => {
    if (!userData.email || !userData.password) {
        throw Error('All fields are required');
    }
    

    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send user data as JSON
    });

    const data = await res.json(); // Parse the response

    if (!res.ok) {
        throw Error(data.error); // Throw an error if the response is not OK
    }

    // Store the token and email in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("role", userData.role);

    return data; // Return the response data
};

// controllers/authController.js

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // Add more cleanup logic if needed (like clearing other user data)
    
    return true; // Return true to indicate logout success
};


// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error fetching users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    });
    if (!response.ok) {
      throw new Error('Error updating user role');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
