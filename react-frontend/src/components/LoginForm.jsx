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
          sessionStorage.clear();
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

        navigate("/error");

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
            <div className=" mb-1">
             
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  minLength={5}
                  autoFocus={true}
                  placeholder="Type in your email eg. someone@example.com"
                />
            </div>
            <div className=" mb-1">
             
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Type in your password"

                />
             
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
