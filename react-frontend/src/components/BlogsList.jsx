import { Link } from "react-router-dom";

function BlogsList({ blogs }) {
  return (
      <div className="card-body bg-body">
        <div className="row row-cols-1 row-cols-md-4 justify-content-center ">
          {blogs.map((blog) => (
            <div className="card shadow rounded col m-2 ">
                      <img src="..." className="card-img-top" alt="..."/>

              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.body_text}</p>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <Link
                    to={`show/${blog.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    More Dedtails
                  </Link>{" "}
                </div>
              </div>
              <div className="card-footer bg-white text-center">
                <small class="text-body-secondary">{blog.created_at}</small>
              </div>
            </div>

          ))}
        </div>
      </div>
   
  );
}

export default BlogsList;
