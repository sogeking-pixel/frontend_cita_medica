import AppRouter from "./routes/AppRouter"; 
import Background from "./components/BackGround";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Background />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App
