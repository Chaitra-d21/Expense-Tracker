import { useState, useRef, useEffect } from "react"; //useState → to control whether dropdown is open or closed, useRef → to detect clicks outside the component,useEffect → to handle outside-click event listener
import "./UserProfile.css";           // CSS file → styling the component

function UserProfile({ username, onLogout }) {
  const [open, setOpen] = useState(false);          // open = false → dropdown is hidden initially,open = true → dropdown becomes visible
  const dropdownRef = useRef(null);                 // Reference for Outside Click, This tracks the entire profile component

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-profile" ref={dropdownRef}>   //UI Structure

      {/* PROFILE HEADER */}
      <div className="user-info" onClick={() => setOpen(!open)}> // Clicking profile toggles dropdown:Open → close,Closed → open
        <div className="profile-avatar">
          {username?.charAt(0).toUpperCase()}  //Takes first letter of username
        </div>

        <span className="user-name">{username}</span>
      </div>

      {/* DROPDOWN MENU */}
      {open && (
        <div className="dropdown-menu">                  // Dropdown shows only when open = true
          <button onClick={onLogout}>Logout</button>     //onLogout handles actual logout logic from parent component
        </div>
      )}

    </div>
  );
}

export default UserProfile;