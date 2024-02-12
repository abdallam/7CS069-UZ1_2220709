import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
function HomePage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark ">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-bootstrap"></i> Blogging
          </span>
        </div>
      </nav>
      <div className="text-center ">
        <Tabs
          defaultActiveKey="login"
          transition={false}
          id="auth-tabs"
          className="mb-3 fw-bold bg-light"
          justify
          
        >
          <Tab eventKey="login" title="Login"> 
            <LoginForm></LoginForm>
          </Tab>
          <Tab eventKey="register" title="Register">
            <RegisterForm></RegisterForm>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default HomePage;
