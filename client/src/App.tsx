import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Academy from "./pages/Academy";
import Jobs from "./pages/Jobs";
import Marketplace from "./pages/Marketplace";
import Knowledge from "./pages/Knowledge";
import Licenses from "./pages/Licenses";
import Schools from "./pages/Schools";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/academy" component={Academy} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/knowledge" component={Knowledge} />
      <Route path="/licenses" component={Licenses} />
      <Route path="/schools" component={Schools} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
