import AppRouter from "./routes/AppRouter"; 
import Background from "./components/BackGround";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Background />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App
