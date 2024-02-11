import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {

  return (
    <>
      <main>
        <MainNavigation />
        <Outlet />
        {/* <nav className="navbar mb-0  bg-primary mt-5 justify-content-center">
          <div className="row p-1 w-100">
            <div  className="  fw-bold text-light text-muted"> All Rights Recieved</div>
          </div>
        </nav> */}
      </main>
    </>
  );
}

export default RootLayout;
