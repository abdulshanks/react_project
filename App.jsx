// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import Notfound from "./Pages/Notfound";
// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import Main from "./Pages/Main";
// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
// import Transfer from "./Components/Transfer";
// import Deposit from "./Components/Deposit";
// import TransactionHistory from "./Components/TransactionHistory";

// export function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/main" element={<Main />} />
//         <Route path="/transaction" element={<TransactionHistory />} />
//         <Route path="/transfer" element={<Transfer />} />
//         <Route path="/deposit" element={<Deposit />} />
//         <Route path="*" element={<h1>Not Found</h1>} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Main from "./Pages/Main";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Transfer from "./Components/Transfer";
import Deposit from "./Components/Deposit";
import TransactionHistory from "./Components/TransactionHistory";

// A simple PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., by checking token in localStorage)
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Set to true if token exists, false otherwise
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: "100vh" }}>
        Loading...
      </div>
    ); // Or a proper loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRoute>
              <TransactionHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <PrivateRoute>
              <Transfer />
            </PrivateRoute>
          }
        />
        <Route
          path="/deposit"
          element={
            <PrivateRoute>
              <Deposit />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <h1 className="flex-center" style={{ minHeight: "80vh" }}>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
