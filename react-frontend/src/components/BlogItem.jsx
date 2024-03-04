import { Form, Link, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

import axios from "axios";

function BlogItem({ blog }) {
  const credentials = JSON.parse(sessionStorage.getItem("credentials"));
  const bottomRef = useRef(null);
  const [user] = useState(credentials.id);
  
  const params = useParams();
  const blogId = params.blogId;
  const [comms, setComms] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments(blogId);
  }, []);

  function getComments(blogId) {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/comments/" + blogId, {
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
          setComms(response.data.data);
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
  function commentHandler() {
    setShow(true);
  }
  function handleSubmit(event) {
    event.preventDefault();
    document.getElementById("saveCommentBtn").disabled = true;
    let comment = document.getElementById("body").value;
    axios
      .post(
        "http://localhost:8000/api/comment/add",
        {
          blog_id: blogId,
          comment: comment,
        },
        {
          headers: { Authorization: "Bearer " + credentials.token },
        }
      )
      .then((response) => {
        document.getElementById("saveCommentBtn").disabled = false;

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
          event.target.reset();
          toast.success(response.data.message, {
            theme: "colored",
          });
          getComments(blogId);
          bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        } else {
          toast.error("An error occured.", {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        document.getElementById("saveCommentBtn").disabled = false;

        console.log(error);
        toast.error(error.message, {
          theme: "colored",
        });
      });
  }
  function deleteComment(id) {
    const proceed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (proceed) {
      axios
        .post(
          "http://localhost:8000/api/comment/delete",
          { id: id },
          {
            headers: { Authorization: "Bearer " + credentials.token },
          }
        )
        .then((response) => {
          const message = response.data.message;
          if (response.data.error === 1)
            toast.success(message, {
              theme: "colored",
            });
          else if (response.data.error === 0) {
            bottomRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
            getComments(blogId);
            toast.success(message, {
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
      
      
        {(loading)? <div className="row alert alert-success fw-bold ">Loading data...</div> : (comms.length > 0 ? (
          comms.map((comm) => (
            <div
              className="flex-shrink-1  bg-light rounded  px-3 me-3"
              key={comm.id}
            >
              <div>
                <small className="fw-bold mb-1">
                  {" "}
                  {comm.user.name} [{comm.user.email}]
                </small>

                {comm.user.id === user ? <button
                  className="btn btn-sm btn-danger rounded float-end"
                  title="Delete Comment"
                  onClick={() => deleteComment(comm.id)}
                  // disabled={comm.user.id === user ? false : true}

                >
                  <i className="bi bi-trash"></i> Delete
                </button> :  ""}
               
              </div>
              <p> {comm.comment}</p>
              <hr />
            </div>
          ))
        ) : (
          <div className="alert bg-danger text-white fw-bold">
              There are no comments found.
            </div>
        ))}
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Comment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" onSubmit={handleSubmit}>
            <div className="form-group row mb-1">
              <div className="col-sm-12">
                <textarea
                  className="form-control"
                  rows="10"
                  id="body"
                  name="body"
                  placeholder=" Please type your comment ..."
                  minLength={10}
                ></textarea>
              </div>
            </div>
            <div className="col-sm-12 ">
              <button
                className="btn btn-primary   m-1 float-end"
                id="saveCommentBtn"
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
      <div ref={bottomRef} /> {/* An empty element to scroll to */}
    </div>
  );
}

export default BlogItem;
