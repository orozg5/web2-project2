import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { FirstCategory } from "./pages/FirstCategory";
import { SecondCategory } from "./pages/SecondCategory";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    const randomValue = Math.random().toString(36);
    document.cookie = `cookie=${randomValue}`;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/first-category" element={<FirstCategory />} />
          <Route path="/second-category" element={<SecondCategory />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
