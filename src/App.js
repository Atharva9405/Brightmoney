import { useSelector } from "react-redux";
import Dashboard from "./components/bills/Dashboard";

const App = () => {
  const isLoading = useSelector((state) => state.bills.isLoading);

  return (
    <div className="min-h-screen bg-background">
      <main className="top-0">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
};

export default App;
