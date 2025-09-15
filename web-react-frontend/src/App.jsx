import AppRouter from "./routes/AppRouter"; 
import Background from "./components/BackGround";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Background />
      <AppRouter />
      <Toaster />
    </BrowserRouter>
  );
}

export default App
