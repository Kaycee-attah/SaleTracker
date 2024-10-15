import React, { useEffect, useState } from 'react';
import { deleteUser, fetchUsers, updateUserRole } from '../../Controllers/userController';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = async (userId, newRole) => {
    try {
      const updatedUser = await updateUserRole(userId, newRole);
      console.log('Updated User:', updatedUser);
      getUsers(); // Refresh the list after editing
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      console.log('User deleted');
      getUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full p-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Manage Users</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <button
                  className="px-4 py-1 mr-2 text-white bg-blue-500 rounded"
                  onClick={() => handleEdit(user._id, prompt('Enter new role:', user.role))}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 text-white bg-red-500 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
