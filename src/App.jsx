import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-strong)] text-[var(--color-text-primary)]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto" key={location.pathname}>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
