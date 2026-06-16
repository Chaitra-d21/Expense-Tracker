import { useState } from "react";   //useState is used to store the username and password entered by the user.
import "./Login.css";    // Login.css is imported to apply styling to the login page.

function Login({ onLogin }) {       //The onLogin function comes from App.js and is used to notify the application when login is successful.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");      //These variables store the values entered by the user.

  const handleSubmit = (e) => {                   //This function runs when the user clicks the Login button.
    e.preventDefault();                //Normally, submitting a form refreshes the page.This line prevents that behavior so React can handle the login process.

    // Hardcoded login check
    if (username === "chaitra.d" && password === "212003") {
      onLogin(username);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">          //Creates the full-page login screen.
      <form className="login-card" onSubmit={handleSubmit}>     //Creates the login card
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}   // Stores the username entered by the user.
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"                     // Because the type is password, the text is hidden:
            value={password}
            onChange={(e) => setPassword(e.target.value)}   //Stores the password entered by the user.
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>   // When clicked:Login,handleSubmit(),Validate credentials,Allow or deny access
    </div>
  );
}

export default Login;
