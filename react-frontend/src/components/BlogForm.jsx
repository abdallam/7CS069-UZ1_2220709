import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  useSubmit,
  json,
  redirect,
} from "react-router-dom";
import axios from "axios";

function BlogForm({ method, blog }) {
  const response = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      title: formData.get("title"),
      body: formData.get("body"),
      photo: formData.get("photo"),
      user_id: 1,
    };

    console.log(data);
    //      submit(data, {
    //     method: "post",

    //  });
    axios
      .postForm("http://localhost:8000/api/blogs/create", event.target)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === 1) {
          console.log(response.data.data);
         window.alert('Some error happened');
        } 
        if (response.data.error === 0) window.alert('Success'); 
      })
      .catch((error) => {
        console.log(error);
      });


  }

  function cancelHandler() {
    navigate("/blogs");
  }

  return (
    <div className="container col-md-6">
    <div className="card  shadow m-5   rounded">
      <div className="card-header">
        <h5 > Item Details</h5>
      </div>
      <div className="card-body bg-body">
        <Form method={method} onSubmit={handleSubmit}>
          <div className="form-group row mb-1 mt-0">
            <div className="alert  ">
              {response && response.data && (
                <ul>
                  {Object.values(response.data).map((err) => (
                    <li key={err} className="text-danger fw-bold">
                      {err}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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
               Image <span className="text-danger"></span>{" "}
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
              />
            </div></div>
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
