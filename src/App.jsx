import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import {Toaster} from 'react-hot-toast'
import BackgroundComponent from './components/BackgroundComponent'

// Lazy-loaded so each page (and its dependencies, like jsPDF/html2canvas
// pulled in by QuotationPreview) only downloads when that route is visited.
const Home = lazy(() => import("./pages/Home"));
const QuotationPreview = lazy(() => import("./components/QuotationPreview"));

function App() {
  return (
    <BrowserRouter>
    <Toaster />
    <BackgroundComponent/>
      <div className="flex flex-col min-h-screen">
      <h1 className="text-center m-auto text-2xl font-semibold bg-gradient-to-r from-green-600 to-indigo-600 text-white rounded-lg mb-2 px-5 py-1 italic pb-2 mt-2" >Quotation-Generator</h1>

        <div className="flex-grow">
          <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/preview" element={<QuotationPreview />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
