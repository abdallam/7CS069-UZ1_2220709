import { useRouteError, Link, useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  let title = "An error occurred.";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found.";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark ">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-bootstrap"></i> Blogging
          </span>
        </div>
      </nav>
      <PageContent title={title}>
        <div className="alert bg-danger text-white fw-bold">{message}</div>
        <p>
          To go back please click{" "}
          <Link onClick={goBack} className=" btn-link">
            here
          </Link>{", "}
          to go to the log in page click <Link to="/">here</Link>.
        </p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
