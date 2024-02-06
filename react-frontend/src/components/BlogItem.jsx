import { Link, useSubmit } from "react-router-dom";
import {  toast } from 'react-toastify';

function BlogItem({ blog }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    toast.error("Wow so easy !",{
      theme: "colored"
    });
    // const proceed = window.confirm("Are you sure you want to delete this blog item?");
    // if (proceed) {
    //   submit(null, { method: "delete",} );
    // }
  }

  return (
    <div className="card m-3">
      <img
        src={blog.photo}
        width={100}
        height={250}
        className="card-img-top"
        alt={blog.photo}
      />
      <div className="card-header row">
        <div className="card-title col">
          <h5>{blog.title}</h5>
        </div>
        <div className="col input-group justify-content-end">
          <Link className="btn btn-sm  m-1 btn-warning rounded" to="edit">
            <i className="bi bi-pencil-square"></i> Edit
          </Link>
          <button
            className="btn btn-sm m-1 btn-danger rounded"
            onClick={startDeleteHandler}
          >
            {" "}
            <i className="bi bi-trash"></i> Delete
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

    // <article classNameName=''>
    //   <img src={blog.image} alt={blog.title} />
    //   <h1>{blog.title}</h1>
    //   <time>{blog.created_at}</time>
    //   <p>{blog.body_text}</p>
    //   <menu classNameName=''>
    //     <Link to="edit">Edit</Link>
    //     <button onClick={startDeleteHandler}>Delete</button>
    //   </menu>
    // </article>
  );
}

export default BlogItem;
