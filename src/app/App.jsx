/**
 * App Component
 * 
<<<<<<< HEAD
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
=======
 * Root application component. Simple wrapper around the main app.
 * 
 * @component
 */
import LitchfieldPerkApp from "./LitchfieldPerkApp";

export default function App() {
  return <LitchfieldPerkApp />;
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
}
