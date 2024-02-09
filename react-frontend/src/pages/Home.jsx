import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoginForm from "../components/LoginForm";
function HomePage() {
  return (
    <div className="justifiy-contnet-center m-5">
      <Tabs
        defaultActiveKey="login"
        transition={false}
        id="auth-tabs"
        className="mb-3"
      >
        <Tab eventKey="login" title="Login">
          <LoginForm></LoginForm>
        </Tab>
        <Tab eventKey="register" title="Register">
          Tab content for Profile
        </Tab>
      </Tabs>
    </div>
  );
}

export default HomePage;
