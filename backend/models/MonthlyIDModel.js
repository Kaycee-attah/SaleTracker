// models/MonthlyID.js
import mongoose from 'mongoose';

const MonthlyIDSchema = new mongoose.Schema({
  monthYear: { type: String, required: true, unique: true }, // E.g. "10/24"
  count: { type: Number, default: 1 }, // Counter to keep track of generated IDs for the month
});

const MonthlyID = mongoose.model('MonthlyID', MonthlyIDSchema);

export default MonthlyID;



