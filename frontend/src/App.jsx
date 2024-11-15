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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import SignaturesHistory from './pages/Signatures History/SignaturesHistory';

const AppContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== "/" && location.pathname !== "/login-page";

  return (
    <div className="min-h-screen">
      <ThemeSwitcher />
      
      {showSidebar ? (
        <div className="flex min-h-screen">
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
    <AppContent />
  </BrowserRouter>
);

export default App;