import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import Category from "./pages/Category";
import ActivityDetail from "./pages/ActivityDetail";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import Orders from "./pages/Orders";
import Service from "./pages/Service";
import TicketDetail from "./pages/TicketDetail";
import Notifications from "./pages/Notifications";
import Coupons from "./pages/Coupons";
import ProfileEdit from "./pages/ProfileEdit";
import Verify from "./pages/Verify";
import Points from "./pages/Points";
import PointsCenter from "./pages/PointsCenter";
import SearchPage from "./pages/SearchPage";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import HealthRecord from "./pages/HealthRecord";
import EmergencyContact from "./pages/EmergencyContact";
import Membership from "./pages/Membership";
import Achievements from "./pages/Achievements";
import SafetyCenter from "./pages/SafetyCenter";
import Badges from "./pages/Badges";
import Events from "./pages/Events";
import Awards from "./pages/Awards";
import Insurance from "./pages/Insurance";
import Calendar from "./pages/Calendar";
import Review from "./pages/Review";
import Reviews from "./pages/Reviews";
import PointsMall from "./pages/PointsMall";
import ProductDetail from "./pages/ProductDetail";
import OrderCreate from "./pages/OrderCreate";
import OrderList from "./pages/OrderList";
import OrderDetail from "./pages/OrderDetail";
import ScanPage from "./pages/ScanPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category" element={<Category />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/activity/:id/review" element={<Review />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile/orders" element={<Orders />} />
            <Route path="/profile/coupons" element={<Coupons />} />
            <Route path="/profile/points" element={<PointsCenter />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/profile/verify" element={<Verify />} />
            <Route path="/profile/favorites" element={<Favorites />} />
            <Route path="/profile/reviews" element={<Reviews />} />
            <Route path="/profile/settings" element={<Settings />} />
            <Route path="/profile/health-record" element={<HealthRecord />} />
            <Route path="/profile/emergency-contact" element={<EmergencyContact />} />
            <Route path="/profile/membership" element={<Membership />} />
            <Route path="/profile/achievements" element={<Achievements />} />
            <Route path="/profile/safety" element={<SafetyCenter />} />
            <Route path="/profile/badges" element={<Badges />} />
            <Route path="/profile/events" element={<Events />} />
            <Route path="/profile/awards" element={<Awards />} />
            <Route path="/profile/insurance" element={<Insurance />} />
            <Route path="/service" element={<Service />} />
            <Route path="/service/ticket/:id" element={<TicketDetail />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/points-mall" element={<PointsMall />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order/create" element={<OrderCreate />} />
            <Route path="/order/list" element={<OrderList />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/scan" element={<PointsCenter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
