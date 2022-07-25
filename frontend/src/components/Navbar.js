import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Events
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/viewevents">
                View Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/eventcreationform">
                Create Event
              </Link>
            </li>
          </ul>
          <div className="m-2">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline-primary"
            >
              Login
            </button>
          </div>
          <div className="m-2">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
          <div className="m-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search events"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
