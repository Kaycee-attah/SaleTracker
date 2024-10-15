import AdminUser from "../../models/AdminUserModel.js";



export const getAdminUserIdByUserId = async (req, res) => {
  const { userId } = req.params;  // Extract userId from the request parameters

  try {
    const adminUser = await AdminUser.findOne({ userId }); // Find the document by userId
    if (!adminUser) {
      return res.status(404).json({ error: 'Admin User not found' });
    }
    res.status(200).json(adminUser); // Return only the _id
  } catch (error) {
    res.status(500).json({ error: 'Error fetching admin user ID' });
  }
};
