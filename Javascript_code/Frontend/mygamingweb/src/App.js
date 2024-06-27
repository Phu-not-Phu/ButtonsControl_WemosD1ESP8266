import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Evangelion from "./pages/evangelion/evangelion";
import Jojopar2 from "./pages/jojo_part_2/jojo_part_2";

function App() {
  return (
    <div classname="App">
      <Router>
        <div className="big-container">
          <Routes>
            <Route path="/evangelion" element={<Evangelion />} />
            <Route path="/jojo-part-2" element={<Jojopar2 />}></Route>
            <Route path="*" element={<Evangelion />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
