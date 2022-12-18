import "./App.css";
import { Route, Routes } from "react-router";
import Join from "./components/Join";
import Chat from "./components/Chat";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
