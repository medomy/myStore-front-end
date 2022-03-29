import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavbarAdmin } from './admin-side/components/navbar/navbar';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
//import HomeAdminPage from './admin-side/pages/adminHome/adminHome';
import {HomeAdminPage , ProductsAdminPage, OrdersAdminPage , UsersAdminPage , CartAdminPage ,
   CommentAdminPage , AddProductAdmin , CategoriesAdmin , AddCategoriesAdmin , EditCategoryPage} from './admin-side/pages'
/*import ProductsAdminPage from './admin-side/pages/productAdmin/productsAdmin';
import OrdersAdminPage from './admin-side/pages/ordersAdmin/ordrsAdmin';
import UsersAdminPage from './admin-side/pages/usersAdmin/usersAdmin';
import CartAdminPage from './admin-side/pages/cartAdmin/cartAdmin';
import CommentAdminPage from './admin-side/pages/commentsAdmin/commentAdmin';*/

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeAdminPage />} />
          <Route path="/admin/categories" element={<CategoriesAdmin />} />
          <Route path="/admin/categories/add" element={<AddCategoriesAdmin />} />
          <Route path="/admin/categories/edit/:id" element={<EditCategoryPage />} />
          <Route path="/admin/products" element={<ProductsAdminPage />} />
          <Route path="/admin/products/add" element={<AddProductAdmin />} />
          <Route path="/admin/orders" element={<OrdersAdminPage />} />
          <Route path="/admin/users" element={<UsersAdminPage />} />
          <Route path="/admin/cart" element={<CartAdminPage />} />
          <Route path="/admin/comments" element={<CommentAdminPage />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
