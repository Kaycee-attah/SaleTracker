// controllers/idController.js
export const generateID = async () => {
    try {
      const response = await fetch('/api/generate-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate ID');
      }
  
      const data = await response.json();
      return data.newID; // Returns the generated ID (e.g., "10/24", "10/24-2")
    } catch (error) {
      console.error('Error generating ID:', error);
      throw error;
    }
  };
  