import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from '@chakra-ui/react'
import Allusers from "./pages/Allusers";
import Practice from "./pages/Practice";
import Otpform from "./components/Authentication/Otpform";


function App() {
  return (
    
        <ChakraProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/allusers" element={<Allusers />} />
          <Route path="/forgot-password" element={<Otpform />} />
        </Routes>
      </BrowserRouter>
        </ChakraProvider>
  );
}

export default App;
