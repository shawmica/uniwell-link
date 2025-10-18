import { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { store } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser, setLoading } from "./store/userSlice";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AIAssistant from "./pages/ai/AIAssistant";
import PeerLearning from "./pages/peer/PeerLearning";
import Hostels from "./pages/hostel/Hostels";
import Wellness from "./pages/wellness/Wellness";
import Messages from "./pages/messages/Messages";
import Settings from "./pages/settings/Settings";

// Components
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";

const queryClient = new QueryClient();

function AppRoutes() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        dispatch(setUser(JSON.parse(savedUser)));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    }
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Index />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="peer-learning" element={<PeerLearning />} />
        <Route path="hostels" element={<Hostels />} />
        <Route path="wellness" element={<Wellness />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Redirect old paths to dashboard */}
      <Route path="/ai-assistant" element={<Navigate to="/dashboard/ai-assistant" replace />} />
      <Route path="/peer-learning" element={<Navigate to="/dashboard/peer-learning" replace />} />
      <Route path="/hostels" element={<Navigate to="/dashboard/hostels" replace />} />
      <Route path="/wellness" element={<Navigate to="/dashboard/wellness" replace />} />
      <Route path="/messages" element={<Navigate to="/dashboard/messages" replace />} />
      <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
