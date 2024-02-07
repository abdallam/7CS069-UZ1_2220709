import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function BlogForm({ method, blog }) {
  const response = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .postForm("http://localhost:8000/api/update", event.target)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === 1) {
          const errors = response.data.message;

          if (Array.isArray(errors)) {
            for (let i = 0; i < errors.length; i++) {
              toast.error(errors[i], {
                theme: "colored",
              });
            }
          } else {
            toast.error(errors, {
              theme: "colored",
            });
          }
        } else if (response.data.error === 0) {
         // redirect("/blogs/show/" + response.data.data);
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

  function cancelHandler(id) {
    navigate("/blogs/show/" + id);
  }

  return (
    <div className="container ">
      <div className="card     border-0">
        <div className="card-body bg-body">
          <Form method={method} onSubmit={handleSubmit}>
            <input
              type="hidden"
              className="form-control"
              id="blogID"
              name="blogID"
              defaultValue={blog ? blog.id : 0}
            />
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
                  required
                  minLength={5}
                  autoFocus
                  placeholder=" Blog item title"
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
                  placeholder="Blog item body ..."
                  required
                  minLength={10}
                  defaultValue={blog ? blog.body_text : ""}
                ></textarea>
              </div>
            </div>

            <div className="col-sm-12 ">
              <button
                className="btn btn-primary  m-1 float-end"
                id="savebtn"
                type="submit"
                disabled={isSubmitting}
              >
                <i className="bi bi-save"></i>{" "}
                {isSubmitting ? "Submitting..." : "Save"}
              </button>

              <button
                className="btn btn-secondary  m-1 float-end"
                id={blog.id}
                type="button"
                onClick={(e) => cancelHandler(e.target.id)}
                disabled={isSubmitting}
              >
                <i className="bi bi-x-circle"></i> Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default BlogForm;

export async function action({ request, params }) {
  //window.alert('here');
  const data = await request.formData();

  //Object.fromEntries(await request.formData());

  //   const blogData = { title: data.get("title"),body: data.get("body"),photo: data.get("image") };
  //const send = JSON.stringify(data);
  //multipart/form-data

  const response = fetch("http://localhost:8000/api/blogs/create", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });

  const res = await response.json();
  console.log("im" + res);

  // if (res.error === 1) {
  //   console.log(res.data);
  //   return response;
  // } else return redirect("/blogs");
}
