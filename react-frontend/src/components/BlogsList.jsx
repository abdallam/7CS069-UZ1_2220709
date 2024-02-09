import { Link, Form, useNavigation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
function BlogsList({ blogs }) {
  const [show, setShow] = useState(false);
  const [blog, setBlog] = useState(null);
  const [flag, setFlag] = useState(false);
  const [record, setRecord] = useState(0);

  const handleClose = () => setShow(false);
  function handleShow() {
    setBlog(null);
    setShow(true);
    setFlag(false);
  }
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function handleSubmit(event) {
    event.preventDefault();

    let url = "http://localhost:8000/api/blogs/create";

    if (flag) url = "http://localhost:8000/api/blog/update/" + record;

    axios
      .postForm(url, event.target)
      .then((response) => {
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
          navigate("/blogs");
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
        console.log(error);
        toast.error(error.message, {
          theme: "colored",
        });
      });
  }

  function updateHandler(id) {
    axios
      .get("http://localhost:8000/api/blog/" + id)
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
    
    const proceed = window.confirm("Are you sure you want to delete this blog item?");
    if (proceed) {
      axios
      .post("http://localhost:8000/api/blog/delete/" + id)
      .then((response) => {
        if (response.data.error === 1) {
          const errors = response.data.message;
            toast.error(errors, {
              theme: "colored",
            });
        } else if (response.data.error === 0) {
          navigate("/blogs");
          toast.success("Deleted successfully.", {
            theme: "colored",
          });
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
  return (
    <div className="card">
      <div className="card-header">
        <button
          className="btn  btn-primary  m-1 float-end"
          onClick={handleShow}
        >
          <i className="bi bi-plus-lg"></i> Create Blog
        </button>
      </div>
      <div className="card-body bg-body">
        <div className="row row-cols-1 row-cols-md-5 justify-content-center ">
          {blogs.map((blog) => (
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
              <div className="card-footer bg-light text-center">
                {/* <Link to={`show/${blog.id}`} className="btn btn-primary btn-sm">
                  <i className="bi bi-info-circle"></i>
                  <span> More Dedtails </span>
                </Link> */}
                <button
                  className="btn btn-sm m-1 btn-warning "
                  onClick={() => updateHandler(blog.id)}
                >
                  <i className="bi bi-pencil-square"></i> edit
                </button>
                <button
                  className="btn btn-sm m-1 btn-danger "
                  onClick={() => deleteHandler(blog.id)}

                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
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
                id="savebtn"
                type="submit"
                disabled={isSubmitting}
              >
                <i className="bi bi-save"></i>{" "}
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
              <button
                className="btn btn-secondary   m-1 float-end"
                id="cancelBtn"
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
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
