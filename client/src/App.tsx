import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SoundProvider } from "./contexts/SoundContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Public from "./pages/Public";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Archive from "./pages/Archive";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={() => <Public section="about" />} />
    <Route path="/team" component={() => <Public section="team" />} />
    <Route path="/contact" component={() => <Public section="contact" />} />
    <Route path="/join-us" component={() => <Public section="talent" />} />
    <Route path="/search" component={() => <Public section="search" />} />
    <Route path="/comics" component={() => <Archive kind="comic" />} />
    <Route path="/games" component={() => <Archive kind="game" />} />
    <Route path="/videos" component={() => <Archive kind="video" />} />
    <Route path="/animation" component={() => <Archive kind="animation" />} />
    <Route path="/music" component={() => <Archive kind="music" />} />
    <Route path="/latest-releases" component={() => <Archive kind="release" />} />
    <Route path="/updates" component={() => <Archive kind="update" />} />
    <Route path="/projects" component={() => <Archive kind="project" />} />
    <Route path="/characters" component={() => <Archive kind="character" />} />
    <Route path="/universes" component={() => <Archive kind="universe" />} />
    <Route path="/artwork" component={() => <Archive kind="artwork" />} />
    <Route path="/admin" component={Admin} />
    <Route path="/admin/:rest*" component={Admin} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark" switchable><SoundProvider><TooltipProvider><Toaster /><Router /></TooltipProvider></SoundProvider></ThemeProvider></ErrorBoundary>;
}
