const BASE_URL = 'https://saletracker-backend.onrender.com/api';

// Function to get sales
export const getSales = async ({ date, category, timeFrame }) => {
    const queryParams = new URLSearchParams({
        date,
        category,
        timeFrame,
    }).toString();

    
    const res = await fetch(`${BASE_URL}/sales?${queryParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json(); // Parse the response

    if (!res.ok) {
        throw Error(data.error); // Throw an error if the response is not OK
    }

    return data; // Return the sales data
};


// Function to add a new sale
export const addSale = async (saleData) => {
    console.log(saleData);
    
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData), // Convert saleData to JSON
    });
    
    const data = await res.json(); // Parse the response

    if (!res.ok) {
        throw Error(data.error); // Throw an error if the response is not OK
    }

    return data; // Return the created sale
};

// Function to delete a sale
export const deleteSale = async (id) => {
    const res = await fetch(`${BASE_URL}/sales/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json(); // Parse the response

    if (!res.ok) {
        throw Error(data.error); // Throw an error if the response is not OK
    }

    return data; // Return the response (could be a success message)
};

// Function to update an existing sale
export const updateSale = async (id, saleData) => {
    console.log(saleData);
    
    
    
    const res = await fetch(`${BASE_URL}/sales/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData), // Convert saleData to JSON
    });

    const data = await res.json(); // Parse the response
    console.log(data);
    

    if (!res.ok) {
        throw Error(data.error); // Throw an error if the response is not OK
    }

    return data; // Return the updated sale data
};

