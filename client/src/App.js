import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Notes from "./pages/Notes";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/notes"
            element={<PrivateRoute Component={Notes} />} //PrivateRoute is an HOC
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
