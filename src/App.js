import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddQuiz from "./pages/addQuiz/AddQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
