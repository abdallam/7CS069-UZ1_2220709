import { Link, Form, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
function BlogsList() {
  const credentials = JSON.parse(sessionStorage.getItem("credentials"));
  const navigate = useNavigate();
  if (!credentials) navigate("/");
  const [loading, setLoading] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [user] = useState(credentials.id);
  const [show, setShow] = useState(false);
  const [blog, setBlog] = useState(null);
  const [flag, setFlag] = useState(false);
  const [record, setRecord] = useState(0);

  useEffect(() => {
    setLoading(true);
    getBlogs();
  }, []);

  function getBlogs() {
    axios
      .get("http://localhost:8000/api/blogs", {
        headers: { Authorization: "Bearer " + credentials.token },
      })
      .then((response) => {
        setLoading(false);

        if (response.data.error === 1) {
          const errors = response.data.message;
          toast.error(errors, {
            theme: "colored",
          });
        } else if (response.data.error === 0) {
          setBlogs(response.data.data);
        } else {
          setLoading(false);
          toast.error("An error occured.", {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, {
          theme: "colored",
        });
      });
  }
  const handleClose = () => setShow(false);
  function handleShow() {
    setBlog(null);
    setShow(true);
    setFlag(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    document.getElementById("saveBtn").disabled = true;

    let url = "http://localhost:8000/api/blogs/create";

    if (flag) url = "http://localhost:8000/api/blog/update/" + record;

    axios
      .postForm(url, event.target, {
        headers: { Authorization: "Bearer " + credentials.token },
      })
      .then((response) => {
        document.getElementById("saveBtn").disabled = false;

        if (response.data.error === 1) {
          const errors = response.data.message;
          if (Array.isArray(errors)) {
            for (let i = 0; i < errors.length; i++) {
              toast.error(errors[i], {
                theme: "colored",
              });
            }
          } else
            toast.error(errors, {
              theme: "colored",
            });
        } else if (response.data.error === 0) {
          setShow(false);
          //navigate("/blogs");
          getBlogs();
          toast.success("Success", {
            theme: "colored",
          });
        } else {
          toast.error("An error occured.", {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        document.getElementById("saveBtn").disabled = false;

        console.log(error);
        toast.error(error.message, {
          theme: "colored",
        });
      });
  }

  function updateHandler(id) {
    axios
      .get("http://localhost:8000/api/blog/" + id, {
        headers: { Authorization: "Bearer " + credentials.token },
      })
      .then((response) => {
        if (response.data.error === 1) {
          const errors = response.data.message;
          toast.error(errors, {
            theme: "colored",
          });
        } else if (response.data.error === 0) {
          setFlag(true);
          setRecord(id);
          setBlog(response.data.data);
          setShow(true);
        } else {
          toast.error("An error occured.", {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, {
          theme: "colored",
        });
      });
  }

  function deleteHandler(id) {
    const proceed = window.confirm(
      "Are you sure you want to delete this blog item?"
    );
    if (proceed) {
      axios
        .post(
          "http://localhost:8000/api/blog/delete",
          { id: id },
          {
            headers: { Authorization: "Bearer " + credentials.token },
          }
        )
        .then((response) => {
          const message = response.data.message;
          toast.success(message, {
            theme: "colored",
          });
          if (response.data.error === 0) {
            // navigate("/blogs");
            getBlogs();
          } else {
            toast.error("An error occured.", {
              theme: "colored",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message, {
            theme: "colored",
          });
        });
    }
  }

  function searchHandler(e) {
    e.preventDefault();
    setLoading(true);
    let text = document.getElementById("search").value;
    axios
      .post(
        "http://localhost:8000/api/search",
        { search: text },
        {
          headers: { Authorization: "Bearer " + credentials.token },
        }
      )
      .then((response) => {
        console.log(response.data);
        setLoading(false);

        if (response.data.error === 1) {
          const errors = response.data.message;
          if (Array.isArray(errors)) {
            for (let i = 0; i < errors.length; i++) {
              toast.error(errors[i], {
                theme: "colored",
              });
            }
          } else
            toast.error(errors, {
              theme: "colored",
            });
        } else if (response.data.error === 0) {
          //  let res=response.data.data;
          setBlogs(response.data.data);
        } else {
          toast.error("An error occured.", {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
        toast.error(error.message, {
          theme: "colored",
        });
      });
  }
  if (loading) {
    return <div className="row alert alert-success fw-bold">Loading data...</div>;
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-4">
            {" "}
            <h5>Welcome {credentials.name}</h5>
          </div>
          <div className="col-8">
            <form
              className="d-flex "
              role="search"
              onSubmit={searchHandler}
            >
              <div className="col">
              <input
                className="form-control me-2"
                type="text"
                id="search"
                placeholder="Search"
                aria-label="Search"
                required
              />
              </div>
              <div className=" input-group col">
                <button className="btn btn-outline-success " type="submit">
                  <i className="bi bi-search"></i> Search
                </button>
                <button
                  className="btn btn-outline-danger "
                  type="reset"
                  onClick={getBlogs}
                >
                  <i className="bi bi-arrow-clockwise"></i> Refresh
                </button>
                <button
              className="btn  btn-outline-primary   "
              onClick={handleShow}
              title="Create blog item"
            >
              <i className="bi bi-plus-lg"></i> Add
            </button>
              </div>
            </form>
          </div>
         
        </div>
      </div>
      <div className="card-body bg-body">
        <div className="row row-cols-1 row-cols-md-5 justify-content-center ">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="card shadow rounded col m-2 ">
                <img
                  src={blog.photo}
                  width={100}
                  height={250}
                  className="card-img-top p-2 mt-1"
                />

                <div className="card-body">
                  <Link to={`show/${blog.id}`} className="text-decoration-none">
                    <h5 className="card-title">{blog.title}</h5>
                    <small className="text-body-secondary">
                      {" "}
                      <i className="bi bi-person-circle"></i> {blog.user.name}
                    </small>
                    <br />
                    <small className="text-body-secondary">
                      {" "}
                      <i className="bi bi-calendar-check"></i> {blog.created_at}
                    </small>
                  </Link>
                </div>
                {blog.user.id === user ?  <div className="card-footer bg-light text-center btn-group">
                  <button
                    className="btn btn-sm m-1 btn-warning  rounded"
                    // disabled={blog.user.id === user ? false : true}
                    onClick={() => updateHandler(blog.id)}
                    title="Edit Item"
                  >
                    <i className="bi bi-pencil-square"></i> edit
                  </button>
                  <button
                    className="btn btn-sm m-1 btn-danger rounded"
                    // disabled={blog.user.id === user ? false : true}
                    onClick={() => deleteHandler(blog.id)}
                    title="Delete Item"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div> : ""}
               
              </div>
            ))
          ) : (
            <div className="alert bg-danger text-white fw-bold">
              There are no blog items found.
            </div>
          )}
        </div>
      </div>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <BlogForm method={"post"} /> 
          <i className="bi bi-asterisk text-danger"></i>

          */}
          <Form method="post" onSubmit={handleSubmit}>
            <div className="form-group row mb-1">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  minLength={5}
                  autoFocus
                  placeholder=" Please add a title"
                  defaultValue={blog ? blog.title : ""}
                />
              </div>
            </div>
            <div className="form-group row mb-1">
              <label htmlFor="image" className="col-sm-2 col-form-label">
                Image
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  id="photo"
                  name="photo"
                />
              </div>
            </div>
            <div className="form-group row mb-1">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Body
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="10"
                  id="body"
                  name="body"
                  placeholder=" body ..."
                  minLength={10}
                  defaultValue={blog ? blog.body_text : ""}
                ></textarea>
              </div>
            </div>
            <div className="col-sm-12 ">
              <button
                className="btn btn-primary   m-1 float-end"
                id="saveBtn"
                type="submit"
              >
                <i className="bi bi-save"></i> Save
              </button>
              <button
                className="btn btn-secondary   m-1 float-end"
                id="cancelBtn"
                type="button"
                onClick={handleClose}
              >
                <i className="bi bi-x-circle"></i> Cancel
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BlogsList;
