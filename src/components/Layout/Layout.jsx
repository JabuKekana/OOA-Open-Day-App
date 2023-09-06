import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';
import AdminNav from '../../admin/AdminNav';
import { useLocation } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';

const Layout = () => {
  const location = useLocation();

  // Check if the current location is 'signup'
  const isSignUpPage = location.pathname === '/signup';

  // Check if the current location is an admin page
  const isAdminPage = location.pathname.startsWith('/dashboard');

  // Determine whether to render the header and Navbar
  const shouldRenderHeaderAndNavbar = !isSignUpPage && !isAdminPage;

  return (
    <>
      {/* Render the header and Navbar conditionally */}
      {shouldRenderHeaderAndNavbar && (
        <>
          <Header />
          <Navbar />
        </>
      )}

      {/* Render AdminNav for admin pages */}
      {isAdminPage && <AdminNav />}

      <div>
        <Routers />
      </div>

      {/* Render the footer conditionally */}
      {!isSignUpPage && <Footer />}
    </>
  );
};

export default Layout;
