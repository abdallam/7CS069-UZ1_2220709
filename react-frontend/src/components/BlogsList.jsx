import { Link, Form, useNavigation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
function BlogsList({ blogs }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .postForm("http://localhost:8000/api/blogs/create", event.target)
      .then((response) => {
        //console.log(response.data);
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
        toast.error("Something went wrong!!", {
          theme: "colored",
        });
      });
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
                <h5 className="card-title">{blog.title}</h5>
                {/* <p className="card-text">{blog.body_text}</p> */}
                <small className="text-body-secondary">
                  {" "}
                  <i className="bi bi-person-circle"></i> {blog.user.name}
                </small>
                <br />
                <small className="text-body-secondary">
                  {" "}
                  <i className="bi bi-calendar-check"></i> {blog.created_at}
                </small>
              </div>
              <div className="card-footer bg-light text-center">
                <Link to={`show/${blog.id}`} className="btn btn-primary btn-sm">
                  <i className="bi bi-info-circle"></i>
                  <span> More Dedtails </span>
                </Link>
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
          {/* <BlogForm method={"post"} /> */}

          <Form method="post" onSubmit={handleSubmit}>
            <div className="form-group row mb-1">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Title <i className="bi bi-asterisk text-danger"></i>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  minLength={5}
                  autoFocus
                  required
                  placeholder=" Please add a title"
                  // defaultValue={blog ? blog.title : ""}
                />
              </div>
            </div>
            <div className="form-group row mb-1">
              <label htmlFor="image" className="col-sm-2 col-form-label">
                Image <i className="bi bi-asterisk text-danger"></i>
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  required
                  className="form-control"
                  id="photo"
                  name="photo"
                />
              </div>
            </div>
            <div className="form-group row mb-1">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Body <i className="bi bi-asterisk text-danger"></i>
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="10"
                  id="body"
                  name="body"
                  required
                  placeholder=" body ..."
                  minLength={10}
                  //  defaultValue={blog ? blog.body_text : ""}
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
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default BlogsList;
