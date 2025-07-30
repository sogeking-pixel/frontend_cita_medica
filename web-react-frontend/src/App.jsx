import { useState } from 'react'
import AppRouter from "./routes/AppRouter"; 
import Background from "./components/BackGround";
import { BrowserRouter } from "react-router-dom";
import Header from "./layouts/Header";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Background />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App
