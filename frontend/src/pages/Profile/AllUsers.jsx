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
    <div className="w-full h-screen p-4 bg-white rounded-lg shadow-lg md:p-8">
      <h2 className="mb-4 text-lg font-semibold text-center md:text-xl">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 text-sm text-left md:px-4 md:text-base">Email</th>
              <th className="px-2 py-2 text-sm text-left md:px-4 md:text-base">Created At</th>
              <th className="px-2 py-2 text-sm text-left md:px-4 md:text-base">Role</th>
              <th className="px-2 py-2 text-sm text-left md:px-4 md:text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-2 py-2 text-sm md:px-4 md:text-base">{user.email}</td>
                <td className="px-2 py-2 text-sm md:px-4 md:text-base">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-2 py-2 text-sm md:px-4 md:text-base">{user.role}</td>
                <td className="flex flex-col gap-2 px-2 py-2 md:px-4 md:flex-row">
                  <button
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded md:text-sm"
                    onClick={() => handleEdit(user._id, prompt('Enter new role:', user.role))}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-xs text-white bg-red-500 rounded md:text-sm"
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
    </div>
  );
};

export default AllUsers;
