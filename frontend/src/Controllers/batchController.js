const BASE_URL = '/api'; // Adjust the base URL if needed

// Function to create a new batch
export const createBatch = async (batchData) => {
  const res = await fetch(`${BASE_URL}/batches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`
    },
    body: JSON.stringify(batchData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || 'Failed to create batch');
  }

  return data; // Return the success message and batch data
};

// Function to fetch all batches (if needed in the future)
export const fetchBatches = async () => {
  const res = await fetch(`${BASE_URL}/batches`, {
    headers: {
        Authorization: `${localStorage.getItem('token')}`
    }
  });
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.message || 'Failed to fetch batches');
  }

  return data;
};
