import { BrowserRouter, Routes, Route } from "react-router-dom";
import LitchfieldPerkApp from "./LitchfieldPerkApp";
import WholesalePage from "../pages/WholesalePage";

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<LitchfieldPerkApp />} />
        <Route path="/wholesale" element={<WholesalePage />} />
      </Routes>
    </BrowserRouter>
  );
}
