import HomePage from "./pages/Home/HomePage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

/*
#048A81 - Dark Blue
#06D6A0 - Light Green
#06070E - Black
#F7F0F5 - Magnolia
#C8BFC7 - French Gray
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
