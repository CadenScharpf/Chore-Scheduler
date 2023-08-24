import React from "react";
import logo from "./logo.svg";
import Cookies from "js-cookie";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/private/Dashboard";
import Login from "./pages/public/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = React.useState(undefined);
  
  React.useEffect(() => {
    if (!Cookies.get("token")) {
      
    }
  }, []);

  return user ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <></>
  );
}

export default App;

{
  /* {jwt ? <div>Logged in</div> : <div>Not logged in</div>}
<button
onClick={() => {
const data = {
email: "u16scharpf@gmail.com",
password: "Password@1",
};
fetch("/api/auth/login", {
method: "POST",
headers: {
  "Content-Type": "application/json",
},
body: JSON.stringify(data),
})
.then((data) => {
  console.log("Login response:", data);
  setJwt(Cookies.get("Chore-Scheduler"))
})
.catch((error) => {
  console.error("Login failed:", error);
});
}}
>
Login
</button> */
}
