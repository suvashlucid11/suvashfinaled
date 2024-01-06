import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Caterine from "./display/Caterine";
import Navbar from "./component/Navbar";
import Registerdisplay from "./display/Registerdisplay";
import Bookinsscreen from "./display/Bookinsscreen";
import "antd/dist/reset.css";
import Logindisplay from "./display/Logindisplay";
import Profilescreen from "./display/Profilescreen";
import Adminscreen from "./display/Adminscreen";
import Landingscreen from "./display/Landingscreen";
function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/home" element={<Caterine />} />
          {/* Use a dynamic route parameter :vid */}
          <Route
            path="/book/:vid/:fromdate/:todate"
            exact
            element={<Bookinsscreen />}
          />

          <Route path="/register" exact element={<Registerdisplay />} />
          <Route path="/login" exact element={<Logindisplay />} />
          <Route path="/profile" exact element={<Profilescreen />} />
          <Route path="/admin" exact element={<Adminscreen />} />
          <Route path="/" exact element={<Landingscreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

