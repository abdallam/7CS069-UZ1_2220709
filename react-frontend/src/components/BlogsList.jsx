import { Link } from "react-router-dom";

function BlogsList({ blogs }) {
  return (
    <div className="card">
    <div className="card-header">
      <button className="btn btn-sm btn-primary rounded m-1 float-end"><i className="bi bi-plus-lg"></i> Add new blog</button>
    </div>
      <div className="card-body bg-body">
        <div className="row row-cols-1 row-cols-md-5 justify-content-center ">
          {blogs.map((blog) => (
            <div key={blog.id} className="card shadow rounded col m-2 ">
                      <img src={blog.photo} width={100} height={250} className="card-img-top p-2 mt-1"/>

              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                {/* <p className="card-text">{blog.body_text}</p> */}
                <small className="text-body-secondary"> <i className="bi bi-person-circle"></i> {blog.user.name}</small>
                <br />
                <small className="text-body-secondary"> <i className="bi bi-calendar-check"></i> {blog.created_at}</small>

              </div>
              <div className="card-footer bg-light text-center">
              <Link
                    to={`show/${blog.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="bi bi-info-circle"></i>
                   <span>  More Dedtails </span>
                  </Link>
              </div>
            </div>

          ))}
        </div>
      </div>
      </div>
  );
}

export default BlogsList;
