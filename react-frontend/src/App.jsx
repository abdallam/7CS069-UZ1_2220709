import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import BlogDetailsPage from "./pages/Blogs";
import BlogNewPage from "./pages/BlogNew";
import BlogEditPage from "./pages/BlogEdit";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
   // errorElement: <ErrorPage />,
    children: [
      {
       index:true,
        element: <HomePage />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
      },
      {
        path: "blogs:blogId",
        element: <BlogDetailsPage />,
      },
      {
        path: "blogs/new",
        element: <BlogNewPage />,
      },
      {
        path: "blogs:blogId/edit",
        element: <BlogEditPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
