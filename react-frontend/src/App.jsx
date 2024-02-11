import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import BlogsPage, { loader as blogsLoader } from "./pages/Blogs";
import BlogDetailsPage, { loader as blogLoader } from "./pages/BlogDetails";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
        loader: blogsLoader,
      },
      {
        path: "blogs/show/:blogId",
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
