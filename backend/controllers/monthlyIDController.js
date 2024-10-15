import MonthlyID from "../models/MonthlyIDModel.js";


// Generate ID for the current month and year
export const generateID = async (req, res) => {
  try {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero
    const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year
    const monthYear = `${month}/${year}`;

    // Check if an ID has already been generated for this month/year
    let monthlyID = await MonthlyID.findOne({ monthYear });

    if (!monthlyID) {
      // If not found, create a new record with a count of 1
      monthlyID = new MonthlyID({ monthYear, count: 1 });
    } else {
      // Increment the count if an ID already exists for the current month/year
      monthlyID.count += 1;
    }

    // Save the new or updated record in the database
    await monthlyID.save();

    // Create the new ID based on the count
    const newID = monthlyID.count === 1 ? monthYear : `${monthYear}-${monthlyID.count}`;

    // Return the new ID as the response
    res.status(200).json({ newID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
