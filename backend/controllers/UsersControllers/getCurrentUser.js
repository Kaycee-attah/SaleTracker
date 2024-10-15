import User from "../../models/UserModel.js";

export const getCurreneUser = async (req, res) => {
    try {
      // Get the logged-in user's email from the session, token, or req.user if using a middleware like Passport.js
      const { email } = req.params;  // Get email from URL parameters
      
  
      const user = await User.findOne({ email });
      console.log(email);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send user details back (excluding sensitive info like password)
      res.json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
