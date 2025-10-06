import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";

// import Login from "./pages/Login";

import Account from "./pages/Account.jsx";
import Settings from "./pages/Settings.jsx";
// import NavBar from "./components/NavBar.tsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import VantaBackground from "./components/VantaBackground.tsx";
import ChatBotWidget from "./components/ChatBotWidget.tsx";
import MobileHelpButton from "./components/MobileHelpButton.tsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import About from "./pages/About.jsx";
 
 
 

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => (

<>
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> 
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col relative">
            <VantaBackground />
            
            {/* <NavBar /> */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/account" element={<Account />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <ChatBotWidget />
            <MobileHelpButton />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </GoogleOAuthProvider>
  </>
);

createRoot(document.getElementById("root")).render(<App />);
