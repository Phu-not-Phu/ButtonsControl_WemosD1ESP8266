import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Evangelion from "./pages/evangelion/evangelion";
import TypingTest from "./pages/typing_test/typing_test";

function App() {
  return (
    <div classname="App">
      <Router>
        <div className="big-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evangelion" element={<Evangelion />} />
            <Route path="/typing_test" element={<TypingTest />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
