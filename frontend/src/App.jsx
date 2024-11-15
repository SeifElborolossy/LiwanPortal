// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import OrderDetails from "./pages/Order Details/OrderDetails";
import OrderHistory from "./pages/Order History/OrderHistory";
import LiwanPortal from "./pages/Main Page/LiwanPortal";
import EditOrder from './pages/EditOrder/EditOrder';
import Schedule from './pages/Schedule/Schedule';
import SubmitOrder from "./pages/Submit Order/SubmitOrder";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LoginPage from "./pages/Login Page/LoginPage";
import ThemeSwitcher from "./components/ui/ThemeSwitcher";
import { AppSidebar } from "./components/ui/app-sidebar";
import OrdarApproval from "./pages/Order Approval/OrderApproval"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import SignaturesHistory from './pages/Signatures History/SignaturesHistory';
import { ThemeProvider } from '../src/components/ui/ThemeContext';

const AppContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== "/" && location.pathname !== "/login-page";

  return (
    <div className="min-h-screen">
       
      
      {showSidebar ? (
        <div className="flex min-h-screen">
           <ThemeSwitcher/>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex-1">
              <div className="p-4">
                <SidebarTrigger className="mb-4" />
                <Routes>
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/order-details" element={<OrderDetails />} />
                  <Route path="/edit-order" element={<EditOrder />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/submit-order" element={<SubmitOrder />} />
                  <Route path="/page-not-found" element={<PageNotFound />} />
                  <Route path='/signatures-history' element={<SignaturesHistory />} />
                  <Route exact path="/order-approval" element= {<OrdarApproval/>}/>
                </Routes>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      ) : (
        <div className="w-full">
          <Routes>
            <Route path="/" element={<LiwanPortal />} />
            <Route path="/login-page" element={<LoginPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;