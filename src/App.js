import { useSelector } from "react-redux";
import Dashboard from "./components/bills/Dashboard";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BillListPage from "./pages/BillListPage";

const App = () => {
  const isLoading = useSelector((state) => state.bills.isLoading);

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <main className="top-0">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bills" element={<BillListPage />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
