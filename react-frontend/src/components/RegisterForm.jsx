import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
function RegisterForm() {
  function handleSubmit(e) {

    e.preventDefault();
    axios
      .postForm("http://localhost:8000/api/register", e.target)
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
          e.target.reset();
          toast.success("Account created, Please login now.", {
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
  return (
    <div className="container ">
      <div className="card  shadow   border-1">
        <div className="card-header alert alert-info">
          <h5>Please fill out your details</h5>
        </div>
        <div className="card-body bg-body">
          <Form method="post" onSubmit={handleSubmit}>
            <div className="form-group row mb-1">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Full Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  autoFocus={true}
                  required
                  minLength={5}
                />
              </div>
            </div>
            <div className="form-group row mb-1">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  minLength={5}
                  autoFocus
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
                  name="password"
                />
              </div>
            </div>

            <div className="col-sm-12 ">
              <button
                className="btn btn-primary  m-1 float-end"
                id="regBtn"
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

export default RegisterForm;
