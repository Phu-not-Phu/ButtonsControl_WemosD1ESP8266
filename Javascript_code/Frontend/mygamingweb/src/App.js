import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Evangelion from "./pages/evangelion/evangelion";

function App() {
  return (
    <div classname="App">
      <Router>
        <div className="big-container">
          <Routes>
            <Route path="/evangelion" element={<Evangelion />} />

            <Route path="*" element={<Evangelion />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
