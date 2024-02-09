import { Link, useSubmit  } from "react-router-dom";

function BlogItem({ blog }) {
  const submit = useSubmit();

  function commentHandler() {
    
    const proceed = window.confirm("Are you sure you want to comment this blog item?");
    if (proceed) {
    //  submit(null, { method: "delete",} );
    }
  }

  return (
    <div className="card m-3">
      <img
        src={blog.photo}
        width={100}
        height={250}
        className="card-img-top"
        alt=""
      />
      <div className="card-header row">
        <div className="card-title col">
          <h5>{blog.title}</h5>
        </div>
        <div className="col input-group justify-content-end">
        <Link className="btn btn-sm  m-1 btn-secondary rounded" to="/blogs">
        <i className="bi bi-arrow-left"></i> Back
          </Link>
        
       
          <button
            className="btn btn-sm m-1 btn-primary rounded"
            onClick={commentHandler}
          >
            {" "}
            <i className="bi bi-plus"></i> Comment
          </button>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{blog.body_text}</p>
        <p className="card-text">
          <small className="text-body-secondary">
            <i className="bi bi-person-circle"></i> {blog.user.name}{" "}
            <i className="bi bi-calendar-check"></i> {blog.created_at}
          </small>
        </p>
      </div>
      <div className="card-footer">
        <p>comments</p>
      </div>
    </div>

   
  );
}

export default BlogItem;
