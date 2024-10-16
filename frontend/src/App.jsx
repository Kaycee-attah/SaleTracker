// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddExpense from "./pages/Expenses/AddExpense";
import ManageExpense from "./pages/Expenses/ManageExpense";
import UserProfile from "./pages/Profile/User";
import AddCategories from "./pages/Expenses/AddCategories";

import AddSalesCategory from "./pages/Sales/AddSalesCategory";
import ManageSales from "./pages/Sales/ManageSales";
import AddBatch from "./pages/Batch/AddBatch";
import BatchDetails from "./pages/Batch/BatchhDetails";
import ManageBatches from "./pages/Batch/ManageBatches";
import BatchManagement from "./pages/Batch/BatchManagementPage";
import AddProduct from "./pages/Product/AddProduct";
import Login from "./pages/Profile/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Profile/Register";
import AuthRoutes from "./Routes/AuthRoutes";
import GuestRoutes from "./Routes/GuestRoutes";
import GuestLayout from "./Layouts/GuestLayout";
import AdminLayout from "./Layouts/AdminLayout";
import AddSales from "./pages/Sales/Add Sales";
import AdminDashboard from "./pages/adminDashboard";
import AllUsers from "./pages/Profile/AllUsers";
import Dashboard from "./pages/Dashboard";

const App = () => {
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/dashboard" element={<Dashboard />}/>
              {/* Unauthenticated routes under "/" */}
              <Route path="/" element={<GuestLayout />}>
                  <Route index element={<Landing />} />
                  <Route element={<GuestRoutes />}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                  </Route>
              </Route>

              {/* Authenticated routes under "/dashboard" */}
              <Route path="/admin-dashboard" element={<AdminLayout />}>
                  <Route element={<AuthRoutes />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="add-expense" element={<AddExpense />} />
                      <Route path="manage-expense" element={<ManageExpense />} />
                      <Route path="add-categories" element={<AddCategories />} />
                      <Route path="add-sales" element={<AddSales />} />
                      <Route path="add-sales-category" element={<AddSalesCategory />} />
                      <Route path="manage-sales" element={<ManageSales />} />
                      <Route path="add-batch" element={<AddBatch />} />
                      <Route path="batch-details" element={<BatchDetails />} />
                      <Route path="manage-batches" element={<ManageBatches />} />
                      <Route path="manage-batches/:id" element={<BatchManagement />} />
                      <Route path="add-product" element={<AddProduct />} />
                      <Route path="user" element={<UserProfile />} />
                      <Route path="all-users" element={<AllUsers />} />
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
    );
};

export default App;
