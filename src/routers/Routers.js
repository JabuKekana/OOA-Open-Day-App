import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Notifications from "../pages/Notifications";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/NotificationDetails";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../routers/ProtectedRoute";
import AddNotifications from "../admin/AddNotifications";
import AllNotifications from "../admin/AllNotifications";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import Credits from '../pages/Credits';
import Map from '../pages/Map';
import Schedule from '../pages/Schedule';
import Queries from '../pages/Queries';
import LandingPage from '../pages/LandingPage';
import Coupons from '../admin/Coupons';
import Categories from '../pages/Categories';
import AddUser from '../admin/AddUser';
import AdminRoute from './AdminRoute';



const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="signup" />} />
      <Route path="home" element={<Home />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="notifications/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="credits" element={<Credits />} />
      <Route path="map" element={<Map />} />
      <Route path="schedule" element={<Schedule/>} />
      <Route path="queries" element={<Queries/>} />
      <Route path="categories" element={<Categories/>} />

      <Route path="/*" element={<ProtectedRoute />}>


      </Route>



      <Route path="/*" element={<AdminRoute />}>

<Route path="dashboard/all-notifications" element={<AllNotifications />} />
<Route path="dashboard/add-notifications" element={<AddNotifications />} />
<Route path="dashboard/users" element={<Users />} />
<Route path="dashboard/coupons" element={<Coupons />} />
<Route path="dashboard/add-user" element={<AddUser />} />
<Route path="dashboard" element={<Dashboard />} />

</Route>





{/* 
        <Route path="dashboard/all-notifications" element={<AllNotifications />} />
        <Route path="dashboard/add-notifications" element={<AddNotifications />} />
        <Route path="dashboard/users" element={<Users />} />
        <Route path="dashboard/coupons" element={<Coupons />} />
        <Route path="dashboard/add-user" element={<AddUser />} />
      <Route path="dashboard" element={<Dashboard />} /> */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="landing" element={<LandingPage />} />
    </Routes>
  );
};

export default Routers;
