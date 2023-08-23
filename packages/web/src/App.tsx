import React from 'react';
import logo from './logo.svg';
import Cookies from "js-cookie";
import './App.css';

function App() {
  const [jwt, setJwt] = React.useState<string | undefined>(undefined);
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;

{/* {jwt ? <div>Logged in</div> : <div>Not logged in</div>}
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
</button> */}