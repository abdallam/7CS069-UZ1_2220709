import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  useSubmit,
  json,
  redirect,
} from "react-router-dom";

function BlogForm({ method, blog }) {
  const response = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    submit(data, { method: "post" });
  }
  function cancelHandler() {
    navigate("/blogs");
  }

  return (
    <div className="card shadow mt-0 mx-3 bg-light rounded">
      <div className="card-header">
        <h5 className="col">Blog Item Details</h5>
       
      </div>
      <div className="card-body bg-body">
        <Form method={method}  onSubmit={handleSubmit}>
        
          <div className="form-group row mb-1 mt-0">
            <div className="alert  ">
          {response && response.data && (  
          <ul>
            {Object.values(response.data).map((err) => (
              <li key={err} className="text-danger fw-bold">{err}</li>
            ))}
          </ul>
        )}
        </div>
          </div>
          <div className="form-group row mb-1">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title <i className="bi bi-asterisk text-danger"></i>
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                required
                minLength={5}
                autoFocus
                placeholder=" Blog item title"
                defaultValue={blog ? blog.title : ""}
              />
            </div>

            <label htmlFor="image" className="col-sm-2 col-form-label">
              Blog item Image <span className="text-danger"></span>{" "}
            </label>
            <div className="col-sm-4">
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
            <div className="col-sm-12">
              <textarea
                className="form-control"
                rows="5"
                id="body"
                name="body"
                placeholder="Blog item body ..."
                required
                minLength={10}
                defaultValue={blog ? blog.body_text : ""}
              ></textarea>
            </div>
          </div>

          <div className="col ">
          <button
            className="btn btn-success btn-sm rounded m-1 float-end"
            id="savebtn"
            type="submit"
            disabled={isSubmitting}
          >
            <i className="bi bi-save"></i>{" "}
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
          <button
            className="btn btn-danger btn-sm rounded m-1 float-end"
            id="cancelBtn"
            type="button"
            onClick={cancelHandler}
            disabled={isSubmitting}
          >
            <i className="bi bi-x-square"></i> Cancel
          </button>
        </div>

        </Form>
      </div>
    </div>
  );
}

export default BlogForm;
