import React, { useState } from 'react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('placeOrder');

    // Placeholder data for order history
    const orderHistory = [
        { id: 1, date: '2024-10-01', product: 'Cassava Flour', quantity: 2, status: 'Delivered' },
        { id: 2, date: '2024-10-05', product: 'Garri Flour', quantity: 5, status: 'Pending' },
    ];

    // Navigation links for the sidebar
    const navItems = [
        { name: 'Place Order', key: 'placeOrder' },
        { name: 'Track Orders', key: 'trackOrders' },
        { name: 'Order History', key: 'orderHistory' },
        { name: 'Edit Profile', key: 'editProfile' },
        { name: 'Logout', key: 'logout' },
        { name: 'Back to Landing', key: 'landing' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/4 p-6 bg-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-white">User Dashboard</h2>
                <nav>
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActiveTab(item.key)}
                            className={`w-full py-2 text-left text-white hover:bg-gray-600 transition ${
                                activeTab === item.key ? 'bg-gray-600' : ''
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 bg-white">
                {activeTab === 'placeOrder' && (
                    <section>
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Place Order</h2>
                        <p>Select your products and place your order here.</p>
                        {/* Add your form or order placement UI here */}
                    </section>
                )}

                {activeTab === 'trackOrders' && (
                    <section>
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Track Orders</h2>
                        <p>Track the status of your current orders.</p>
                        {/* Add your order tracking UI here */}
                    </section>
                )}

                {activeTab === 'orderHistory' && (
                    <section>
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Order History</h2>
                        <table className="w-full bg-white border border-collapse border-gray-300 table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 border border-gray-300">Date</th>
                                    <th className="p-2 border border-gray-300">Product</th>
                                    <th className="p-2 border border-gray-300">Quantity</th>
                                    <th className="p-2 border border-gray-300">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderHistory.map((order) => (
                                    <tr key={order.id} className="text-center">
                                        <td className="p-2 border border-gray-300">{order.date}</td>
                                        <td className="p-2 border border-gray-300">{order.product}</td>
                                        <td className="p-2 border border-gray-300">{order.quantity}</td>
                                        <td className="p-2 border border-gray-300">{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {activeTab === 'editProfile' && (
                    <section>
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Edit Profile</h2>
                        <p>Update your profile details here.</p>
                        {/* Add your profile editing form here */}
                    </section>
                )}

                {activeTab === 'logout' && (
                    <section>
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Logout</h2>
                        <p>You have successfully logged out.</p>
                        {/* Implement logout functionality here */}
                    </section>
                )}

                {activeTab === 'landing' && (
                    <section>
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Back to Landing</h2>
                        <p>Redirecting to the landing page...</p>
                        {/* Implement redirection to the landing page */}
                    </section>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
