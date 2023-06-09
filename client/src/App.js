import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import PrivateRoute from "./routes/PrivateRoute";
import { Layout } from "./components/Layout";
import Archived from "./pages/Archived";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/notes"
            element={
              <Layout>
                <PrivateRoute Component={Notes} />
              </Layout>
            } //PrivateRoute is an HOC
          ></Route>
          <Route
            path="/notes/archived"
            element={
              <Layout>
                <PrivateRoute Component={Archived} />
              </Layout>
            } //PrivateRoute is an HOC
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
