import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("loginBtn").disabled = true;

    axios
      .postForm("http://localhost:8000/api/login", e.target)
      .then((response) => {
        document.getElementById("loginBtn").disabled = false;

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
          sessionStorage.setItem(
            "credentials",
            JSON.stringify(response.data.data)
          );
          navigate("/blogs");
        } else {
          toast.error("An error occured.", {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        document.getElementById("loginBtn").disabled = false;

        console.log(error);
        toast.error(error.message, {
          theme: "colored",
        });
      });
  }
  return (
    <div className="container mt-5">
      <div className="card  shadow rounded-1 col-md-6 offset-md-3 ">
        <div className="card-header alert bg-secondary text-white">
          <h5>Please fill out your credentials</h5>
        </div>
        <div className="card-body bg-body">
          <Form method="post" onSubmit={handleSubmit}>
            <div className="form-group row mb-1">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  minLength={5}
                  autoFocus={true}
                  placeholder=" someone@example.com"
                />
              </div>
            </div>
            <div className="form-group row mb-1">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
            </div>

            <div className="col-sm-12 ">
              <button
                className="btn btn-primary  m-1 float-end"
                id="loginBtn"
                type="submit"
              >
                <i className="bi bi-box-arrow-in-right"></i> Proceed
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
