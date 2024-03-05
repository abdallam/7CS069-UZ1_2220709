import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function MainNavigation() {
  const credentials = JSON.parse(sessionStorage.getItem("credentials"));
  const navigate = useNavigate();
 
  function logoutHandler() {
    if (!credentials) navigate("/");
    else {
      const proceed = window.confirm("Are you sure you want to logout?");
      if (proceed) {
        axios
          .post(
            "http://localhost:8000/api/logout",
            {},
            {
              headers: { Authorization: "Bearer " + credentials.token },
            }
          )
          .then((response) => {
            if (response.data.error === 1) {
              const errors = response.data.message;
              toast.error(errors, {
                theme: "colored",
              });
            } else if (response.data.error === 0) {
              sessionStorage.clear();
              navigate("/");
            } else {
              toast.error("An error occured.", {
                theme: "colored",
              });
            }
          })
          .catch((error) => {
            navigate("/error");

          });
      }
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark ">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">
          <i className="bi bi-bootstrap"></i> Blogging
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMnu"
          aria-controls="navbarMnu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon navbaricon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMnu">
            
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="/blogs" end>
                Blogs
              </NavLink>
            </li>

            <li className="nav-item">
              <button className="nav-link fw-bold" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
