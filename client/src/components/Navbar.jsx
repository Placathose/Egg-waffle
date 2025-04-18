import React, { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from './Icons';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  // If no theme is stored in localStorage, defaults to "light".
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const handleToggle = (e) => {
    if(e.target.checked) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme])

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            Cantonese Study
          </Link>
        </div>

        <div className="flex-none">
          <Link to="/schedule" className="btn btn-ghost">Schedule</Link>
          <Link to="/add-summary" className="btn btn-ghost">Add Summary</Link>
          <Link to="/study" className="btn btn-ghost">Study</Link>         {/* ✅ NEW */}
          <Link to="/quiz" className="btn btn-ghost">Quiz</Link>   

          <button className="btn btn-square btn-ghost">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" onChange={handleToggle} />
              <SunIcon />
              <MoonIcon />
            </label>
          </button>
        </div>
      </div>
    </div>
  )
}
