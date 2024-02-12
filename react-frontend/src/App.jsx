import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BlogDetailsPage, { loader as blogLoader } from "./pages/BlogDetails";

import { ToastContainer } from "react-toastify";

import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/blogs",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BlogsPage />,
      },
      {
        path: "show/:blogId",
        id: "blog-details",
        loader: blogLoader,
        children: [
          {
            index: true,
            element: <BlogDetailsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
      {/* stacked */}
    </div>
  );
}

export default App;
