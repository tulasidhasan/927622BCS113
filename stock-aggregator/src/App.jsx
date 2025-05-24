import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StockPage from "./pages/StockPage";
import HeatmapPage from "./pages/HeatmapPage";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex justify-between">
        <Link to="/">Stock Page</Link>
        <Link to="/heatmap">Correlation Heatmap</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
      </Routes>
    </Router>
  );
}
