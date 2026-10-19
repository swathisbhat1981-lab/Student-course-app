import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
      <div className="container">
        <span className="navbar-brand fw-bold">Student & Course Manager</span>
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/students">Students</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/courses">Courses</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}