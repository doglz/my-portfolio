import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <LanguageProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
