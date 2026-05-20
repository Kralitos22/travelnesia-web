import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import AffiliateLogin from "./pages/AffiliateLogin";
import { AffiliatePage } from "./components/AffiliatePage";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import JamaahLogin from "./pages/JamaahLogin";
import TabunganJamaah from "./pages/TabunganJamaah";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/jamaah/login"} component={JamaahLogin} />
      <Route path={"/tabungan"} component={TabunganJamaah} />
      <Route path={"/affiliate"} component={AffiliatePage} />
      <Route path={"/affiliate/login"} component={AffiliateLogin} />
      <Route path={"/affiliate/dashboard"} component={AffiliateDashboard} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;