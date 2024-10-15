

// Function to fetch expenses from the backend
export const getExpenses = async ({date, category, timeFrame}) => {
    
    // Create the query parameters based on the date and category
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (category) params.append('category', category);
    if (timeFrame) params.append('timeFrame', timeFrame);
  
    const res = await fetch(`/api/expenses?${params.toString()}`); // Append query parameters to the endpoint
    if (!res.ok) throw new Error('Failed to fetch expenses');
    return await res.json();
  };
  
  
  // Function to add a new expense
  export const addExpense = async (expense) => {
    const res = await fetch('/api/expenses/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error('Failed to add expense');
    return await res.json();
  };
  
  // Function to delete an expense
  export const deleteExpense = async (_id) => {
    const res = await fetch(`/api/expenses/${_id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete expense');
    return await res.json();
  };
  
  // Function to update an expense
  export const updateExpense = async (_id, updatedExpense) => {
    const res = await fetch(`/api/expenses/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExpense),
    });
    if (!res.ok) throw new Error('Failed to update expense');
    return await res.json();
  };
  