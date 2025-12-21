/**
 * App Component
 * 
 * Root application component with routing setup.
 * 
 * @component
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LitchfieldPerkApp from "./LitchfieldPerkApp";
import WholesalePage from "../components/sections/WholesalePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LitchfieldPerkApp />} />
        <Route path="/wholesale" element={<WholesalePage />} />
      </Routes>
    </BrowserRouter>
  );
}
