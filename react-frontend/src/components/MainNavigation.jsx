import { NavLink } from "react-router-dom";
//style="background-color:#4265A7;"
function MainNavigation() {
  return (
    <nav  className="navbar navbar-expand-lg bg-primary navbar-dark ">
    <div className="container-fluid">

        <span className="navbar-brand fw-bold" >
        <i className="bi bi-bootstrap"></i>   Blogging
        </span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMnu" aria-controls="navbarMnu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon navbaricon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMnu">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                

                <li className="nav-item">
                    <NavLink className="nav-link fw-bold"  to="/" end>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link fw-bold"  to="/blogs">Blogs</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link fw-bold"  to="/new">Add</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to='logout.php' id='logout' title='Log out'>Logout</NavLink>
                </li>
            </ul>
        </div>
    </div>
</nav>
  );
}

export default MainNavigation;
