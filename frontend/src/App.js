import "./App.css";
import Add from "./pages/component/Add/add";
import Signin from "./pages/Signin/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfound from "./pages/Notfound/Notfound";
import Register from "./pages/Register/register";

const ProtectedRoute = ({ children }) => {
  const flagval = JSON.parse(localStorage.getItem("flag"));
  if (flagval === true) {
    return children;
  }
  return <h1>No Access</h1>;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Register/>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/*" element={<Notfound></Notfound>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
