import React from 'react';

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Daily Lesson</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>Login</a></li>
            <li><a>Register</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
