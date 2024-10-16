
import AdminUser from "../../models/AdminUserModel.js";


// Fetch Admin User by userId
export const getAdminUser = async (req, res) => {
  try {
    const adminUser = await AdminUser.findOne({ userId: req.params.userId }).populate('userId');
    if (!adminUser) {
      return res.status(404).json({ error: 'Admin User not found' });
    }
    res.status(200).json(adminUser);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching admin user' });
  }
};

// Create or Update Admin User
export const createOrUpdateAdminUser = async (req, res) => {
  try {
    const { userId, phone, address, bio, imageUrl } = req.body;

    // Check if Admin User exists
    let adminUser = await AdminUser.findOne({ userId });

    if (adminUser) {
      // Update admin user
      adminUser.phone = phone;
      adminUser.address = address;
      adminUser.bio = bio;
      if (imageUrl) adminUser.imageUrl = imageUrl;

      await adminUser.save();
    } else {
      // Create new admin user
      adminUser = new AdminUser({
        userId,
        phone,
        address,
        bio,
        imageUrl,
      });
      await adminUser.save();
    }

    res.status(200).json(adminUser);
  } catch (error) {
    res.status(500).json({ error: 'Error saving admin user' });
  }
};
